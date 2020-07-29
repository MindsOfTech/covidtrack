from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime
import pyqrcode
from server import app, cloud_db  # pull in Flask and database instance


@app.route('/companies', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def companies():
    if request.method == 'POST':

        cmpname = request.args.get('cmpname')
        addr1 = request.args.get('addr1')
        addr2 = request.args.get('addr2')
        parish = request.args.get('parish')
        number = request.args.get('number')
        #data = request.args.to_dict()
        cmpdata = {

            "Company Name": cmpname,
            "Address 1": addr1,
            "Address 2": addr2,
            "Parish": parish,
            "Contact Number": number,
            "user": cmpname,
            "type": "company",
            "Time Scanner": [],
            "Number of Visitors": 0

        }
        new_doc = cloud_db.create_document(cmpdata)
        return jsonify({'MESSAGE': 'done'})


@app.route('/companies')
def looking():
    if request.method == 'GET':
        cmpid = request.args.get('id')
        query = Query(cloud_db, selector={'type': 'company'})
        results = []
        for doc in query.result:
            makeqr(doc['_id'])
            results.append(doc['_id'])
        return jsonify({'results': results})


def makeqr(name):
    qr = pyqrcode.create(name)
    qr.png(name+".png", scale=10)
    # qr.png(f"{'name.png'}," scale=10)
