from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime

# pull in Flask and database instance
from server import app, cloud_db, check_for_token


@app.route('/symptoms', methods=['GET', 'POST', 'PATCH'])
@check_for_token
def symptoms():
    symptdata = request.get_json()
    if request.method == 'POST':
        if symptdata['user'] in cloud_db:
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            symptdata['_id'] = symptdata['user'] + dt_string
            symptdata['Symptoms'] = symptdata['Symptoms']
            symptdata['datetime'] = dt_string
            symptdata['type'] = 'symptoms'

            new_doc = cloud_db.create_document(symptdata)

            return jsonify({'ok': True, 'message': 'Symptoms saved successfully!'}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

    if request.method == 'GET':
        if symptdata['user'] in cloud_db:
            query = Query(cloud_db, selector={
                          'type': 'symptoms', 'user': symptdata['user']})
            results = []
            for doc in query.result:
                results.append(doc)
            return jsonify({'results': results}), 200
        return jsonify({'results': 'USER NAME FOUND'}), 200

    if request.method == 'PATCH':
        try:
            selector = {'user': symptdata['user'],  'type': 'symptoms'}
            usr_query = cloud_db.get_query_result(selector)

            for usr_doc in usr_query:
                doc = usr_doc['_id']
            userdata = cloud_db[doc]
            userdata['Symptoms'] = userdata['Symptoms'] + \
                ", "+symptdata['Symptoms']
            userdata['Test For'] = userdata['Test For'] + \
                ", " + symptdata['Test For']
            userdata.save()
            return jsonify({'results': 'USER UPDATED'}), 200
        except:
            return jsonify({'results': 'USER NOT FOUND'}), 200
