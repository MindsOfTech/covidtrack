from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime

from server import app, cloud_db


@app.route('/medicalHistory', methods=['GET', 'POST'])
def medicalHistory():
    if request.method == 'POST':
        username = request.args.get('username')
        cnt = request.args.get('countries')
        symptomsList = request.args.getlist('symptoms')
        testList = request.args.getlist('tested')
        isdate = request.args.get('influenzatest')
        confirmedex = request.args.get('confirmedex')
        hshold = request.args.get('confirmedex2')

        qry = Query(cloud_db, selector={'type': 'user', 'user': username})
        for doc in qry.result:
            mydoc = doc
        mydoc['Symptoms'] = []
        mydoc['country'] = cnt
        mydoc['Symptoms'] = mydoc['Symptoms'] + symptomsList
        mydoc['Test For'] = testList
        mydoc['Last Influenza Test Date'] = isdate
        mydoc['Have you been exposed to someone confirmed with COVID19'] = confirmedex
        mydoc['Does anyone in your household shows symptoms of covid19'] = hshold
        mydoc['type'] = 'symptoms'
        mydoc['_id'] = mydoc['_id']+'_Symptoms'
        mydoc['type'] = 'symptoms'

        new_doc = cloud_db.create_document(mydoc)
        return ('DONE')

    if request.method == 'GET':
        username = request.args.get('username')
        qry = Query(cloud_db, selector={'type': 'symptoms', 'user': username})
        results = []
        for doc in qry.result:
            results.append(doc)

        return jsonify({'results': results})
