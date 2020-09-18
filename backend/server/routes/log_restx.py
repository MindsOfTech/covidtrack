from flask import Flask, request, json, jsonify
from flask_restx import Resource
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from flask_restx import Resource, Api, fields
from server import app, cloud_db, api, logtitle
from datetime import datetime


logmodel = api.model('LOG DATA MODEL', {
    'user': fields.String(description='a User\'s username'),
    'Company ID': fields.String(description='A Company\'s Identification Number'),
})


@logtitle.route('/get/<id>')
class getLEndpoint(Resource):
    @logtitle.response(200, 'Success')
    @logtitle.response(404, 'USER NOT FOUND')
    @logtitle.doc(params={'id': 'user\'s username'})
    def get(self, id):
        try:
            username = id+'_LOG'
            selector = {'_id': username, 'type': 'log'}
            query = cloud_db.get_query_result(selector)
            for doc in query:
                userdoc = doc['_id']
            return {'MESSAGE': cloud_db[userdoc]}, 200
        except:
            return {'ok': True, 'message': 'no record found'}, 404


@logtitle.route('/post')
class postLEndpoint(Resource):
    @logtitle.expect(logmodel)
    @logtitle.response(200, 'Success')
    @logtitle.response(404, 'USER NOT FOUND')
    def post(self):
        loclist = []
        timelist = []
        try:
            cmpidno = request.json['Company ID']
            username = request.json['user']+'_LOG'

            selector = {'_id': username, 'type': 'log'}
            userquery = cloud_db.get_query_result(selector)

            for doc in userquery:
                logid = doc['_id']
            logdata = cloud_db[logid]
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            # After updating the user's log file. The companies doc is update with the visit.
            companyupdates(cmpidno)

            loclist.append(cmpidno)
            timelist.append(dt_string)

            logdata['Location Visited'] = logdata['Location Visited'] + loclist
            logdata['DateTime Visited'] = logdata['DateTime Visited'] + timelist

            logdata.save()
            return ({'MESSAGE': 'Thanks for checking in'}), 200

        except:

            # CREATES a user's LOG doc

            cmpidno = request.json['Company ID']
            username = request.json['user']+'_LOG'

            selector = {'user': request.json['user'], 'type': 'user'}
            userquery = cloud_db.get_query_result(selector)

            for doc in userquery:
                userid = doc['_id']
            newlog = cloud_db[userid]
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            loclist.append(cmpidno)
            timelist.append(dt_string)
            newlog['Location Visited'] = []
            newlog['DateTime Visited'] = []

            newlog['_id'] = username
            newlog['Location Visited'] = loclist
            newlog['DateTime Visited'] = timelist
            newlog['type'] = 'log'

            # After updating the user's log file. A companies doc is update with the visit.
            companyupdates(cmpidno)

            newdoc = cloud_db.create_document(newlog)
            return ({'MESSAGE': 'Log WAS CREATED and Check in created'}), 200


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
