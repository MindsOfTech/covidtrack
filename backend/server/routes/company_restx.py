from flask import Flask, request, json, jsonify
from flask_restx import Resource
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query
from flask_restx import Resource, Api, fields
from server import app, cloud_db, api


class Company():
    def __init__(self, name, addr1, addr2, contno, prs):
        self.name = name
        self.addr1 = addr1
        self.addr2 = addr2
        self.prs = prs
        self.contno = contno
        self.type = 'Company'
        self.tScann = []
        self.noScann = 0

    def __init__(self):
        self.name = ''
        self.addr1 = ''
        self.addr2 = ''
        self.prs = ''
        self.contno = ''
        self.type = 'Company'
        self.tScann = []
        self.noScann = 0

    def myAppend(self, name, addr1, addr2, contno, prs):
        self.name = name
        self.addr1 = addr1
        self.addr2 = addr2
        self.prs = prs
        self.contno = contno

    def myJsonify(self):
        return {
            'Company Name': self.name,
            'Address One': self.addr1,
            'Address Two': self.addr2,
            'Parish': self.prs,
            'Contact Number': self.contno,
            'type': self.type,
            'Time Scanned': self.tScann,
            'No. Visitors': self.noScann
        }


companymodel = api.model('COMPANY DATA MODEL', {
    'Company Name': fields.String('Company\'s name'),
    'Address One': fields.String('Street Address'),
    'Address Two': fields.String('Town'),
    'Parish': fields.String('Parish'),
    'Contact Number': fields.String('Company\'s contact number'),
})


companydata = Company()


@api.route('/company/get/<id>')
class getCEndpoint(Resource):
    @api.doc(params={'id': 'user\'s username'})
    def get(self, id):
        try:
            selector = {'_id': id, 'type': 'Company'}
            qry = cloud_db.get_query_result(selector)
            for docdata in qry:
                data = docdata['_id']
            return {'MESSAGE': cloud_db[data]}, 200
        except:
            return {'ok': True, 'message': 'no COMPANY record found'}, 200


@api.route('/company/delete/<id>')
class deleteCEndpoint(Resource):
    @api.doc(params={'id': 'user\'s username'})
    def delete(self, id):
        try:
            selector = {'_id': id, 'type': 'Company'}
            qry = cloud_db.get_query_result(selector)
            for docdata in qry:
                data = docdata['_id']
            print(data)
            cloud_db[data].delete()
            return {'MESSAGE': "COMPANY deleted"}, 200
        except:
            return {'ok': True, 'message': 'no COMPANY record found'}, 200


@api.route('/company/post')
class postCEndpoint(Resource):
    @api.expect(companymodel)
    def post(self):
        try:

            companydata.myAppend(name=request.json['Company Name'], addr1=request.json['Address One'],
                                 addr2=request.json['Address Two'], contno=request.json['Contact Number'], prs=request.json['Parish'])
            new_doc = cloud_db.create_document(companydata.myJsonify())
            return {'ok': True, 'message': 'COMPANY created successfully!'}, 200
        except:
            return {'ok': True, 'message': 'ERROR! COMPANY NOT ADDED'}, 200
