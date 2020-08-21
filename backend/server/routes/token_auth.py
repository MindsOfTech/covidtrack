from flask import Flask, render_template, session, request, jsonify, json, redirect, make_response
from cloudant.error import CloudantException
from cloudant import Cloudant
from cloudant.query import Query
import datetime

# pull in Flask and database instance
from server import app, cloud_db, check_for_token
import jwt
from functools import wraps


'''exp_time = datetime.datetime.utcnow()+datetime.timedelta(seconds=3600)'''
curr_time = datetime.datetime.utcnow()

@ app.route('/public')
def public():
    return jsonify({"MESSAGE": "no token needed"})


@ app.route('/auth')
@check_for_token
def private():
    return jsonify({"message": "Welcome to covy", "Current Time": curr_time})


@ app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            username = request.args.get('username')
            password = request.args.get('password')

            selector = {'user': username,
                        'password': password}
            qry = cloud_db.get_query_result(selector)
            for doc in qry:
                data = doc['_id']
            userdata = cloud_db[data]
            session['logged_in'] = True

            token = jwt.encode({'user': username}, app.config['SECRET_KEY'])

            return jsonify({'token': token.decode('utf-8')})
        except:
            return jsonify({"MESSAGE": "LOGIN credentials ERROR - please check username and password."})
    else:
        return jsonify({"MESSAGE": "INAPPROPRIATe REQUEST"})
