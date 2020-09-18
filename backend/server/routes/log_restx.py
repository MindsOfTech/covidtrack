from flask import Flask, request, json, jsonify
from flask_restx import Resource
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from flask_restx import Resource, Api, fields
from server import app, cloud_db, api, logtitle
from datetime import datetime


@logtitle.route('/get/<id>')
class postLEndpoint(Resource):
    @api.doc(params={'id': 'user\'s username'})
    def get(self, id):
        return {'MESSAGE': cloud_db[id]}, 200


@logtitle.route('/post')
class postLEndpoint(Resource):
    def post(self):
        return {}
