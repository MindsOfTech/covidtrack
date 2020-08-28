from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime
import pyqrcode
from server import app, cloud_db  # pull in Flask and database instance


# collects a json (information on a company) and saves it to cloudant
# Compant Information => Company Name, Address One, Address Two, Parish and Contact Number
@app.route('/companies', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def companies():
    if request.method == 'POST':
        cmpdata = request.get_json()
        cmpdata['type'] = 'Company'
        cmpdata['Time Scanned'] = []
        cmpdata['No. Visitors'] = 0
        new_doc = cloud_db.create_document(cmpdata)
        return jsonify({'ok': True, 'message': 'Company DOC created successfully!'}), 200
