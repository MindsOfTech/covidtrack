from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from datetime import datetime
import pyqrcode
from server import app, cloud_db, check_for_token


@app.route('/log', methods=['GET', 'POST'])
@check_for_token
def log():
    userdata = request.get_json()

    if request.method == 'GET':
        name = userdata['user']+'_LOG'
        selector = {'_id': name, 'type': 'log'}
        query = cloud_db.get_query_result(selector)
        for doc in query:
            userdoc = doc['_id']
        return jsonify({"reseult": cloud_db[userdoc]})

    if request.method == 'POST':
        loclist = []
        timelist = []

        # Error Handling
        # If doc of type log is found it will be up dated
        # Otherwise the except will create the log doc.

        try:
            # UPDATES a user's LOG doc

            cmpidno = userdata['cmpID']
            name = userdata['user']+'_LOG'

            selector = {'_id': name, 'type': 'log'}
            userquery = cloud_db.get_query_result(selector)

            for doc in userquery:
                logid = doc['_id']
            logdata = cloud_db[logid]
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            # After updating the user's log file. A companies doc is update with the visit.
            companyupdates(cmpidno)
            loclist.append(userdata['cmpID'])
            timelist.append(dt_string)

            logdata['Location Visited'] = logdata['Location Visited'] + loclist
            logdata['DateTime Visited'] = logdata['DateTime Visited'] + timelist

            logdata.save()
            return ({'MESSAGE': 'Thanks for checking in'})

        except:

            # CREATES a user's LOG doc

            cmpidno = userdata['cmpID']
            name = userdata['user']+'_LOG'

            selector = {'user': userdata['user'], 'type': 'user'}
            userquery = cloud_db.get_query_result(selector)

            for doc in userquery:
                userid = doc['_id']
            newlog = cloud_db[userid]
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            loclist.append(userdata['cmpID'])
            timelist.append(dt_string)
            newlog['Location Visited'] = []
            newlog['DateTime Visited'] = []

            newlog['_id'] = name
            newlog['Location Visited'] = loclist
            newlog['DateTime Visited'] = timelist
            newlog['type'] = 'log'

            # After updating the user's log file. A companies doc is update with the visit.
            companyupdates(cmpidno)

            newdoc = cloud_db.create_document(newlog)
            return ({'MESSAGE': 'Log WAS CREATED and Check in created'})


# Updates a company's doc file on number of visits and date time of visit
def companyupdates(name):
    cmpdoc = cloud_db[name]
    # return cmpdoc
    datetimeList = []
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y:%H:%M")
    datetimeList.append(dt_string)

    cmpdoc['No. Visitors'] = cmpdoc['No. Visitors']+1
    cmpdoc['Time Scanned'] = cmpdoc['Time Scanned']+datetimeList
    cmpdoc.save()
    return jsonify({"Message": cmpdoc['Company Name']})
