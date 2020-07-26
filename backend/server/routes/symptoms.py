from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant

from server import app, cloud_db  # pull in Flask and database instance


@app.route('/symptoms', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def user():
    if request.method == 'POST':
        usrnm = request.form.get('username')
        cnt = request.form.get('countries')
        symptomsList = request.form.getlist('symptoms')
        testList = request.form.getlist('tested')
        isdate = request.form.get('influenzatest')
        confirmedex = request.form.get('confirmedex')
        hshold = request.form.get('confirmedex')
        
        doc_exist = usr in cloud_db
        if doc_exist:
            mydoc = cloud_db[usrnm]
            mydoc['country'] = cnt
            mydoc['symptoms'] = symptomsList
            mydoc['Test For'] = testList
            mydoc['Last Influenza Test Date'] = isdate
            mydoc['Have you been exposed to someone confirmed with COVID19'] = confirmedex
            mydoc['Does anyone in your household shows symptoms of covid19'] = hshold
            mydoc['type'] = 'symptoms'
            mydoc.save()
            return jsonify({'ok': True, 'message': 'User DATA UPDATED successfully!'}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400
