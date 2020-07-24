from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant

from server import app, cloud_db  # pull in Flask and database instance


@app.route('/userSymptoms', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def user():
    if request.method == 'GET':
        usrnm = request.form.get('username')
        cnt = request.form.get('countries')
        symptomsList = request.form.getlist('symptoms')
        testList = request.form.getlist('tested')
        isdate = request.form.get('influenzatest')
        confirmedex = request.form.get('confirmedex')
        hshold = request.form.get('confirmedex')

        data = {
            '_id': usrnm,
            'Country': cnt,
            'Symptoms': symptomsList,
            'Tested For': testList,
            'Last Influenza Test Date': lastDate,
            'Have you been exposed to someone confirmed with COVID19': confirmedex,
            'Does anyone in your household shows Symptoms of covid19': hshold,
            'type': '-Symptoms-'
        }
        doc = mydb.create_document(data)
        if doc.exists():
            return jsonify({'ok': True, 'message': 'User DATA UPDATED successfully!'}), 200
