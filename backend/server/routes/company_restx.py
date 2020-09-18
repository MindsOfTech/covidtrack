from flask import Flask, request, json, jsonify
from flask_restx import Resource
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from flask_restx import Resource, Api, fields
from server import app, cloud_db, api, companytitle


companymodel = api.model('COMPANY DATA MODEL', {
    'Company Name': fields.String(description='Company\'s name'),
    'Address One': fields.String(description='Street Address'),
    'Address Two': fields.String(description='Town'),
    'Parish': fields.String(description='Parish', example='Kingston'),
    'Contact Number': fields.String(description='Company\'s contact number', example="(876)784-4232"),
})


@companytitle.route('/get/<id>')
class getCEndpoint(Resource):
    @api.response(200, 'Success')
    @api.response(404, 'COMPANY NOT FOUND')
    @api.doc(params={'id': 'user\'s username'})
    def get(self, id):
        try:
            selector = {'_id': id, 'type': 'Company'}
            qry = cloud_db.get_query_result(selector)
            for docdata in qry:
                data = docdata['_id']
            return {'MESSAGE': cloud_db[data]}, 200
        except:
            return {'ok': True, 'message': 'no COMPANY record found'}, 404


@companytitle.route('/delete/<id>')
class deleteCEndpoint(Resource):
    @api.response(200, 'Success')
    @api.response(404, 'COMPANY NOT FOUND')
    @api.doc(params={'id': 'user\'s username'})
    def delete(self, id):
        try:
            selector = {'_id': id, 'type': 'Company'}
            qry = cloud_db.get_query_result(selector)
            for docdata in qry:
                data = docdata['_id']
            cloud_db[data].delete()
            return {'MESSAGE': "COMPANY deleted"}, 200
        except:
            return {'ok': True, 'message': 'no COMPANY record found'}, 404


@companytitle.route('/post')
class postCEndpoint(Resource):
    @api.response(200, 'Success')
    @api.response(404, 'COMPANY NOT FOUND')
    @api.expect(companymodel)
    def post(self):
        try:
            xdocData = {
                'Company Name': request.json['Company Name'],
                'Address One': request.json['Address One'],
                'Address Two': request.json['Address Two'],
                'Parish':  request.json['Parish'],
                'Contact Number': request.json['Contact Number'],
                'type': 'Company',
                'Time Scanned': [],
                'No. Visitors': []
            }

            new_doc = cloud_db.create_document(xdocData)
            return {'ok': True, 'message': 'COMPANY created successfully!'}, 200
        except:
            return {'ok': True, 'message': 'ERROR! COMPANY NOT ADDED'}, 404
