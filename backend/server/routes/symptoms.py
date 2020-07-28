from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime

from server import app, cloud_db  # pull in Flask and database instance


@app.route('/symptoms', methods=['GET', 'POST'])
def symptom():
    if request.method == 'POST':
        cnt = request.args.get('countries')
        symptomsList = request.args.getlist('symptoms')
        testList = request.args.getlist('tested')
        isdate = request.args.get('influenzatest')
        confirmedex = request.args.get('confirmedex')
        hshold = request.args.get('confirmedex')

        doc_exist = qry in cloud_db
        if doc_exist:
            mydoc = cloud_db[qry]
            mydoc['country'] = cnt
            mydoc['symptoms'] = mydoc['symptoms'] + symptomsList
            mydoc['Test For'] = testList
            mydoc['Last Influenza Test Date'] = isdate
            mydoc['Have you been exposed to someone confirmed with COVID19'] = confirmedex
            mydoc['Does anyone in your household shows symptoms of covid19'] = hshold
            mydoc['type'] = 'symptoms'
            mydoc.save()
            return jsonify({'ok': True, 'message': 'User DATA UPDATED successfully!'}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

@app.route('/symptoms/<username>', methods=['GET', 'POST'])
def page(username):

    data = request.get_json()
    if request.method == 'POST':
        if username in cloud_db:
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            data['_id'] = username + dt_string
            data['datetime'] = dt_string
            data['user'] = username
            data['type'] = 'symptoms'

            new_doc = cloud_db.create_document(data)
            return jsonify({'ok': True, 'message': 'Symptoms saved successfully!'}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

    if request.method == 'GET':
        if username in cloud_db:
            query = Query(cloud_db, selector={'type': 'symptoms', 'user': username})

            results = []
            for doc in query.result:
                results.append(doc)

            return jsonify({'results':results})




