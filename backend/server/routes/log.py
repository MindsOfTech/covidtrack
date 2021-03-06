from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime
import pyqrcode
from server import app, cloud_db, check_for_token


@app.route('/log/<username>', methods=['GET', 'POST'])
@check_for_token
def log(username):
    data = request.get_json()

    # cmpidno - Company's Identification Number
    if request.method == 'GET':
        name = username+'_LOG'
        selector = {'_id': name, 'type': 'log'}

        query = cloud_db.get_query_result(selector)

        select = {}
        for doc in query:
            select['CompanyName'] = doc['CompanyName']
            select['DateTimeVisited'] = doc['DateTimeVisited']
            select['LocationVisited'] = doc['LocationVisited']
            select['username'] = username

        results = [select]

        return jsonify(select)

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

            cmpname = companyupdates(cmpidno)

            locationList = []
            datetimeList = []
            nameList = []
            locationList.append(cmpidno)
            datetimeList.append(dt_string)
            nameList.append(cmpname)

            if user['_id'] in cloud_db:
                user['LocationVisited'] = user['LocationVisited'] + locationList
                user['DateTimeVisited'] = user['DateTimeVisited'] + datetimeList
                user['CompanyName'] = user['CompanyName'] + nameList

                user.save()
                return ({'MESSAGE': 'Check in was recorded', 'user': user['_id']})

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
            log['LocationVisited'] = []
            log['DateTimeVisited'] = []
            log['CompanyName'] = nameList

            log['_id'] = log['_id']+'_LOG'
            log['LocationVisited'] = log['LocationVisited'] + locationList
            log['DateTimeVisited'] = log['DateTimeVisited'] + datetimeList
            newlog = cloud_db.create_document(log)

            return ({'MESSAGE': 'Log WAS CREATED and Check in created', 'user': log['_id']})


@app.route('/log', methods=['GET'])
@check_for_token
def checkget():
    username = request.args.get('username')
    name = username+'_LOG'
    return jsonify(cloud_db[name])

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
    # return({'message': 'CURRENT QTY', 'Number of Visitors': cmpdoc['Number of Visitors']})


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
