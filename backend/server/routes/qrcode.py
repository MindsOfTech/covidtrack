from flask import Flask, render_template, request, jsonify, json, redirect, send_file
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime
from io import BytesIO

# env shfrom PIL import Image
import pyqrcode
import os
import qrcode
import json

# pull in Flask and database instance
from server import app, cloud_db, check_for_token
# from server import app


# Generating QR CODES for companies
@app.route('/qrCompanies', methods=['GET'])
# @check_for_token
def cmpqr():
    if request.method == 'GET':

        cmpid = request.args.get('id')

        value_to_turn_into_qrcode = json.dumps(
            {'cmpid': cmpid, 'intent': 'locationqr'})
        pil_img = qrcode.make(value_to_turn_into_qrcode)
        img_io = BytesIO()
        pil_img.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')

        query = Query(cloud_db, selector={'type': 'company'})
        results = []
        for doc in query.result:
            makeqr(doc['_id'])
            results.append(doc['_id'])
        return jsonify({'results': results})


# Generating QR CODE for user
@app.route('/qrUser/<username>', methods=['GET'])
# @check_for_token
def userqr(username):
    if request.method == 'GET':
        #userid = request.args.get('_id')
        # makeqr(userid)

        value_to_turn_into_qrcode = json.dumps(
            {'user': username, 'intent': 'userqr'})
        pil_img = qrcode.make(value_to_turn_into_qrcode)
        img_io = BytesIO()
        pil_img.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')

        '''
        response = {'ok': True, 'message': 'CODE GENERATED '}
        return jsonify(response), 200
        '''
        # generate all user qrcode
        """ query = Query(cloud_db, selector={'type': 'symptoms'})
        results = []
        for doc in query.result:
            makeqr(doc['_rev'])
            results.append(doc['_rev'])
        return jsonify({'results': results}) """


# Update company's doc
# @app.route('/scanQrCompanies', methods=['GET', 'POST'])
def scanQrCompanies(name):
    if request.method == 'POST':
        #username = request.args.get('code')
        if name in cloud_db:
            r = []
            doc = cloud_db[name]
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")
            r.append(dt_string)
            doc['Time Scanner'] = doc['Time Scanner'] + r
            doc['Number of Visitors'] = doc['Number of Visitors']+1
            doc.save()
            response = {'ok': True, 'message': 'THANKS FOR VISITING' +
                        str([doc['Company Name'], doc['Address 1'], doc['Parish']])}
            return jsonify(response), 200
        else:
            response = {'ok': True, 'message': 'QR CODE NOT RECOGNIZED '}
            return jsonify(response), 200


@app.route('/ourrecords', methods=['GET', 'POST'])
def ourrecords():
    if request.method == 'POST':
        cmpqr = request.args.get('cmpqr')
        usrqr = request.args.get('usrqr')
        raw = cloud_db[cmpqr]
        if cmpqr in cloud_db and usrqr in cloud_db:
            datetimeList = []
            userList = []
            companyList = []

            records = cloud_db['07665188bf8b2d4a345d36a29529cd10']
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            datetimeList.append(dt_string)
            companyList.append(cmpqr)
            userList.append(usrqr)

            records['Date Time Log'] = records['Date Time Log'] + datetimeList
            records['user'] = records['user'] + userList
            records['company'] = records['company'] + companyList

            """ records['Company Name'] = raw['Company Name']
            records['Company Location Address 1'] = raw['Address 1']
            records['Company Location Address 1'] = raw['Address 1']
            records['Company Location Parish '] = raw['Parish'] """
            records['type'] = 'logs'

            scanQrCompanies(cmpqr)
            records.save()
            response = {'ok': True, 'message': 'THANKS FOR VISITING'}
            return jsonify(response), 200


def makeqr(name):
    qr = pyqrcode.create(name)
    qr.png("QRCODE.png", scale=10)


"""    if request.method == 'GET':
        selector = {'type': 'comapany'}
        qry = cloud_db.get_query_result(selector)
        for doc in qry:
            return doc['_id']

        qr = qrcode.create(
    version=1,
    box_size=15,
    border=5
)
qr.add_data(json_doc1)
qr.make(fit=True)
img = qr.make_image(fill='red', back_color='green')
img.save("image.png", "PNG")


def makeqr(name):
    qr = pyqrcode.create(name)
    qr.png('time.png', scale=10)"""
