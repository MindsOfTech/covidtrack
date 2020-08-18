from flask import Flask, render_template, session, request, jsonify, json, redirect, make_response
from cloudant.error import CloudantException
from cloudant import Cloudant
from cloudant.query import Query
import datetime

from server import app, cloud_db  # pull in Flask and database instance
import jwt
from functools import wraps

app.config['SECRET_KEY'] = ''

exp_time = datetime.datetime.utcnow()+datetime.timedelta(seconds=30)
curr_time = datetime.datetime.utcnow()


def check_for_token(func):
    @ wraps(func)
    def wrapped(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({"MESSAGE": "MISSING token"}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except jwt.exceptions.ExpiredSignatureError:
            return jsonify({"MESSAGE": "SEESION EXPIRED"}), 403
        except jwt.exceptions.DecodeError:
            return jsonify({"MESSAGE": "INVALID token"}), 403

        return func(*args, **kwargs)
    return wrapped


@ app.route('/public')
def public():
    return jsonify({"MESSAGE": "no token needed"})


@ app.route('/auth')
@ check_for_token
def private():
    return jsonify({"message": "Welcome to covy", "Current Time": curr_time})


@ app.route('/login', methods=['POST'])
def login():
    try:
        username = request.args.get('username')
        password = request.args.get('password')
        # let me know is this is too tight.
        selector = {'username': username, 'password': password, 'type': 'user'}
        qry = cloud_db.get_query_result(selector)
        for doc in qry:
            data = doc['_id']
        userdata = cloud_db[data]
        session['logged_in'] = True
        token = jwt.encode({'user': username, 'exp': exp_time},
                           app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('utf-8'), "Expiration Time": exp_time,  "Current Time": curr_time})
    except:
        return jsonify({"MESSAGE": "LOGIN credentials ERROR - please check username and password."})
