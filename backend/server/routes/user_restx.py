from flask import Flask, request, json, jsonify
from flask_restx import Resource
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from flask_restx import Resource, Api, fields
from server import app, cloud_db, api


class User():

    def __init__(self, user, fn, ln, psd, add1, add2, prs, email):
        self.user = user
        self.fn = fn
        self.ln = ln
        self.psd = psd
        self.add1 = add1
        self.add2 = add2
        self.prs = prs
        self.email = email
        self.type = 'user'

    def __init__(self):
        self.user = ''
        self.fn = ''
        self.ln = ''
        self.psd = ''
        self.add1 = ''
        self.add2 = ''
        self.prs = ''
        self.email = ''
        self.type = 'user'
        #self.__init__(isuser, isfn, isln, ispsd,isadd1, isadd2, isprs, isemail)

    def myJsonify(self):
        return {
            'user': self.user,
            '_id': self.user,
            'password': self.psd,
            'firstname': self.fn,
            'lastname': self.ln,
            'Street Address': self.add1,
            'Town': self.add2,
            'Parish': self.prs,
            'E-Mail Address': self.email,
            'type': self.type,
        }

    def getid(self):
        return self.user

    def myAppend(self, user, fn, ln, psd, add1, add2, prs, email):
        self.user = user
        self.fn = fn
        self.ln = ln
        self.psd = psd
        self.add1 = add1
        self.add2 = add2
        self.prs = prs
        self.email = email


usermodel = api.model('USER DATA MODEL', {
    'user': fields.String('username'),
    'password': fields.String('password'),
    'firstname': fields.String('user\'s firstname'),
    'lastname': fields.String('user\'s lastname'),
    'Street Address': fields.String('Street Address'),
    'Town': fields.String('Town'),
    'Parish': fields.String('Parish'),
    'E-Mail Address': fields.String('valid E-Mail Address'),

})

userdata = User()


@api.route('/user/post')
class postEndpoint(Resource):
    @api.expect(usermodel)
    def post(self):
        try:
            userdata.myAppend(
                user=request.json['user'], fn=request.json['firstname'],
                ln=request.json['lastname'], psd=request.json['password'],
                add1=request.json['Street Address'], add2=request.json['Town'], prs=request.json['Parish'],
                email=request.json['E-Mail Address']
            )
            new_doc = cloud_db.create_document(userdata.myJsonify())
            return {'ok': True, 'message': 'User created successfully!'}, 200
        except:
            return {'ok': True, 'message': 'ERROR! USER NOT ADDED'}, 200


@api.route('/user/get/<id>')
class getEndpoint(Resource):
    @api.doc(params={'id': 'user\'s username'})
    def get(self, id):
        try:
            return {'user': cloud_db[id]}, 200
        except:
            return {'ok': True, 'message': 'no record found'}, 200


@api.route('/user/delete/<id>')
class deleteEndpoint(Resource):
    @api.doc(params={'id': 'user\'s username'})
    def delete(self, id):
        try:
            mydoc = cloud_db[id]
            mydoc.delete()
            return {'ok': True, 'message': 'record deleted'}, 200
        except:
            return {'ok': True, 'message': 'no record found'}, 200


@api.route('/user/put/<id>')
class putEndpoint(Resource):
    @api.expect(usermodel)
    def put(self, id):
        try:
            doc = cloud_db[id]

            return {'ok': True, 'message': 'User UPDATED successfully!'}, 200
        except:
            return {'ok': True, 'message': 'User NOT UPDATED successfully!'}, 200
