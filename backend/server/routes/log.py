from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime

from server import app, cloud_db


@app.route('/createlog', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def qrcodeHistory():
    if request.method == 'POST':
        username = request.args.get('username')
        qry = Query(cloud_db, selector={'type': 'user', 'user': username})
        for doc in qry.result:
            r = doc['_id']
        mydoc = cloud_db[r]
        mydoc['type'] = 'log'
        mydoc['_id'] = mydoc['_id']+'_LOG'
        mydoc['Location Visited'] = []
        mydoc['Date Time Visited'] = []
        newdoc = cloud_db.create_document(mydoc)
        return ({'message': 'LOG FILE WAS CREATE'})


@app.route('/qrcodeHistory', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def mc():
    if request.method == 'PATCH':
        username = request.args.get('username')
        location = request.args.get('location')
        # qrcodeHistory(username)
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y:%H:%M")

        locationList = []
        timeList = []

        locationList.append(location)
        timeList.append(dt_string)

        userheck = Query(cloud_db, selector={'type': 'log', 'user': username})
        for doc in userheck.result:
            data = doc['_id']
        newdoc = cloud_db[data]
        newdoc['Location Visited'] = newdoc['Location Visited'] + locationList
        newdoc['Date Time Visited'] = newdoc['Date Time Visited'] + timeList
        newdoc.save()
        return ({'Message': 'LOG file was updated'})
