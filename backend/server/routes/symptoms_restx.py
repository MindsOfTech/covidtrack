from flask import Flask, request, json, jsonify
from flask_restx import Resource
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from flask_restx import Resource, Api, fields
from server import app, cloud_db, api, symptomstitle
from datetime import datetime

symptomsmodel = api.model('USER SYMPTOMS MODEL', {
    'username': fields.String(description='username'),
    'Country of Origin': fields.String(description='The country the user is coming from', example='New Zealand'),
    'Symptoms': fields.String(description='The symptoms the user is displaying.', example=['High Fever', 'Lost of smell']),
    'Illness tested for': fields.String(description='All the Illness the user was tested for.', example=['COVID19', '']),
    'Exposed to an individual with COVID19': fields.String(description='Have you been exposed to COVID19', example='Yes or No'),
})


@symptomstitle.route('/get/<id>')
class getSEndpoint(Resource):
    @api.response(200, 'Success')
    @api.response(404, 'USER NOT FOUND')
    @api.doc(params={'id': 'user\'s username'})
    def get(self, id):
        try:
            selector = {'user': id, 'type': 'Symptoms'}
            qry = cloud_db.get_query_result(selector)
            for docdata in qry:
                data = docdata['_id']
            return {'MESSAGE': cloud_db[data]}, 200
        except:
            return {'ok': True, 'message': 'no COMPANY record found'}, 404


@symptomstitle.route('/post')
class postSEndpoint(Resource):
    @api.response(200, 'Success')
    @api.response(404, 'USER NOT FOUND')
    @api.expect(symptomsmodel)
    def post(self):
        p = request.json['username']
        try:

            selector = {'_id': p, 'type': 'user'}
            qry = cloud_db.get_query_result(selector)
            for docdata in qry:
                data = docdata['_id']

            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y:%H:%M")

            docData = {
                '_id': request.json['username']+dt_string,
                'user': request.json['username'],
                'Country of Origin': request.json['Country of Origin'],
                'Symptoms': request.json['Symptoms'],
                'Illness tested for': request.json['Illness tested for'],
                'Date n Time': dt_string,
                'type': 'Symptoms'
            }
            new_doc = cloud_db.create_document(docData)
            return {'message': 'Symptoms saved successfully!'}, 200
        except:
            return {'ok': False, 'message': 'Bad request parameters!'}, 404
