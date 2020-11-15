from flask import Flask, request, json, jsonify
from flask_restx import Resource
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from flask_restx import Resource, Api, fields
from server import app, cloud_db, api, usertitle


usermodel = api.model('USER DATA MODEL', {
    'user': fields.String(description='username'),
    'password': fields.String(description='password'),
    'firstname': fields.String(description='user\'s firstname'),
    'lastname': fields.String(description='user\'s lastname'),
    'Street Address': fields.String(description='Street Address'),
    'Town': fields.String(description='Town'),
    'Parish': fields.String(description='Parish', example='Kingston'),
    'E-Mail Address': fields.String(description='valid E-Mail Address', example='something@email.com'),

})


@usertitle.route('/post')
class postUEndpoint(Resource):
    @api.expect(usermodel)
    @api.response(200, 'Success')
    @api.response(404, 'USER NOT FOUND')
    def post(self):
        try:
            docData = {
                'user': request.json['user'],
                '_id': request.json['user'],
                'password': request.json['password'],
                'firstname': request.json['firstname'],
                'lastname': request.json['lastname'],
                'Street Address': request.json['Street Address'],
                'Town': request.json['Town'],
                'Parish': request.json['Parish'],
                'E-Mail Address': request.json['E-Mail Address'],
                'type': 'user',
            }
            new_doc = cloud_db.create_document(docData)
            return {'ok': True, 'message': 'User created successfully!'}, 200
        except:
            return {'ok': True, 'message': 'ERROR! USER NOT ADDED'}, 404


@usertitle.route('/get/<id>')
class getUEndpoint(Resource):
    @api.doc(params={'id': 'user\'s username'})
    @api.response(200, 'Success')
    @api.response(404, 'USER NOT FOUND')
    def get(self, id):
        try:
            selector = {'_id': id, 'type': 'user'}
            qry = cloud_db.get_query_result(selector)
            for docdata in qry:
                data = docdata['_id']
            return {'MESSAGE': cloud_db[data]}, 200
        except:
            return {'ok': True, 'message': 'no record found'}, 404


@usertitle.route('/delete/<id>')
class deleteUEndpoint(Resource):
    @api.response(200, 'Success')
    @api.response(404, 'USER NOT FOUND')
    @api.doc(params={'id': 'user\'s username'})
    def delete(self, id):
        try:
            selector = {'_id': id, 'type': 'user'}
            qry = cloud_db.get_query_result(selector)
            for docdata in qry:
                data = docdata['_id']

            mydoc = cloud_db[data]
            mydoc.delete()
            return {'ok': True, 'message': 'record deleted'}, 200
        except:
            return {'ok': True, 'message': 'no record found'}, 404


@usertitle.route('/put/<id>')
class putUEndpoint(Resource):
    @api.response(200, 'Success')
    @api.response(404, 'USER NOT FOUND')
    @api.expect(usermodel)
    def put(self, id):
        try:
            doc = cloud_db[id]

            return {'ok': True, 'message': 'User UPDATED successfully!'}, 200
        except:
            return {'ok': True, 'message': 'User NOT UPDATED successfully!'}, 404
