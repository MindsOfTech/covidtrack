from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime
import pyqrcode
from server import app, cloud_db

# This endpoint does the following:
#   1. Creates or update a user's 'log' file.
#   2. updates a company's 'doc' file (number of visitors and the dateNtime they visited)


@app.route('/updateCreateLog', methods=['GET', 'PATCH', 'POST'])
def updateCreateLog():

    username = request.args.get('id')

    # cmpidno - Company's Identification Number
    cmpidno = request.args.get('cmpidno')
    if request.method == 'POST':
        try:
            name = username+'_LOG'

            selector = {'_id': name, 'type': 'log'}
            userquery = cloud_db.get_query_result(selector)
            for doc in userquery:
                placeh = doc['_id']
            user = cloud_db[placeh]
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            companyupdates(cmpidno)

            locationList = []
            datetimeList = []
            locationList.append(cmpidno)
            datetimeList.append(dt_string)

            if user['_id'] in cloud_db:
                user['Location visited'] = user['Location visited'] + locationList
                user['Date Time Visited'] = user['Date Time Visited'] + datetimeList
                user.save()
                return ({'MESSAGE': 'USER was update', 'user': user['_id']})

        except:
            # If the user with a doc of type 'log' is not found.
            # Another query is used to search for the same user but of type 'user' and creates the log file.
            selector = {'_id': username, 'type': 'user'}
            userquery = cloud_db.get_query_result(selector)
            for doc in userquery:
                placeh = doc['_id']
            log = cloud_db[placeh]
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            companyupdates(cmpidno)
            locationList = []
            datetimeList = []
            locationList.append(cmpidno)
            datetimeList.append(dt_string)
            log['type'] = 'log'
            log['Location visited'] = []
            log['Date Time Visited'] = []
            log['_id'] = log['_id']+'_LOG'
            log['Location visited'] = log['Location visited'] + locationList
            log['Date Time Visited'] = log['Date Time Visited'] + datetimeList
            newlog = cloud_db.create_document(log)

            return ({'MESSGAE': 'USER WAS CREATED', 'user': log['_id']})


# Updates a company's doc file on number of visits and date time of visit
def companyupdates(name):
    if request.method == 'POST':
        cmpdoc = cloud_db[name]
        # return cmpdoc
        datetimeList = []
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y:%H:%M")
        datetimeList.append(dt_string)

        cmpdoc['Number of Visitors'] = cmpdoc['Number of Visitors']+1
        cmpdoc['Time Scanner'] = cmpdoc['Time Scanner']+datetimeList
        cmpdoc.save()
        return({'message': 'CURRENT QTY', 'Number of Visitors': cmpdoc['Number of Visitors']})
