from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime
import pyqrcode
from server import app, cloud_db

@app.route('/log/<username>', methods=['GET','POST'])
def log(username):
    data = request.get_json()

    # cmpidno - Company's Identification Number
    if request.method == 'GET':
        name = username+'_LOG'
        selector = {'_id': name, 'type': 'log'}

        query = cloud_db.get_query_result(selector)

        select = {}
        for doc in query:
            select['Company Name'] = doc['Company Name']
            select['Date Time Visited'] = doc['Date Time Visited']
            select['Location visited'] = doc['Location visited']
            select['username'] = username

        results = [select]
        return jsonify(select), 200

    if request.method == 'POST':
        cmpidno = data['cmpid']
        try:
            name = username+'_LOG'

            selector = {'_id': name, 'type': 'log'}
            userquery = cloud_db.get_query_result(selector)
            for doc in userquery:
                placeh = doc['_id']
            user = cloud_db[placeh]
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            cmpname =companyupdates(cmpidno)

            locationList = []
            datetimeList = []
            nameList = []
            locationList.append(cmpidno)
            datetimeList.append(dt_string)
            nameList.append(cmpname)

            if user['_id'] in cloud_db:
                user['Location visited'] = user['Location visited'] + locationList
                user['Date Time Visited'] = user['Date Time Visited'] + datetimeList
                user['Company Name'] = user['Company Name'] + nameList

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

            cmpname = companyupdates(cmpidno)
            locationList = []
            datetimeList = []
            nameList = []
            locationList.append(cmpidno)
            datetimeList.append(dt_string)
            nameList.append(cmpname)

            log['type'] = 'log'
            log['Location visited'] = []
            log['Date Time Visited'] = []
            log['Company Name'] = nameList

            log['_id'] = log['_id']+'_LOG'
            log['Location visited'] = log['Location visited'] + locationList
            log['Date Time Visited'] = log['Date Time Visited'] + datetimeList
            newlog = cloud_db.create_document(log)

            return ({'MESSGAE': 'USER WAS CREATED', 'user': log['_id']})


# Updates a company's doc file on number of visits and date time of visit
def companyupdates(name):
    cmpdoc = cloud_db[name]
    # return cmpdoc
    datetimeList = []
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y:%H:%M")
    datetimeList.append(dt_string)

    cmpdoc['Number of Visitors'] = cmpdoc['Number of Visitors']+1
    cmpdoc['Time Scanner'] = cmpdoc['Time Scanner']+datetimeList
    cmpdoc.save()
    return cmpdoc['Company Name']
    #return({'message': 'CURRENT QTY', 'Number of Visitors': cmpdoc['Number of Visitors']})

'''
@app.route('/log/<username>', methods=['GET','POST'])
def log(username):
    data = request.get_json()
    if request.method == 'POST':
        qry = Query(cloud_db, selector={'type': 'log', 'user': username})

        empty = True
        for doc in qry.result:
            empty = False
            r = doc['_id']

        if empty:
            json_doc = {
                '_id': username + '_LOG',
                'Location Visited': [data['Location Visited']],
                'Date Time Visited': [data['Date Time Visited']],
                'user': username,
                'type': 'log'
            }

            new_doc = cloud_db.create_document(json_doc)

        else:

            mydoc = cloud_db[r]
            mydoc['Location Visited'].append(data['Location Visited'])
            mydoc['Date Time Visited'].append(data['Date Time Visited'])
            mydoc.save()

        return jsonify({'ok': True, 'message': 'checkin recorded'}), 200


    if request.method == 'GET':
        qry = Query(cloud_db, selector={'type': 'log', 'user': username})
        results = []

        for doc in qry.result:
            results.append(doc)

        return jsonify({'results':results}), 200

'''
