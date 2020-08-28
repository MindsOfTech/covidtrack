import os
from flask import Flask, abort, session, request, redirect
from flask.json import jsonify
from cloudant.client import Cloudant
from functools import wraps

import jwt

app = Flask(__name__, template_folder="../public",
            static_folder="../public", static_url_path='')

ACCOUNT_NAME = "7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix"
API_KEY = "8GlK-4CkdvhsteVdNIGfvEQEifYk5YiyXZpAoVzIEd9w"
app.config['SECRET_KEY'] = '12BIRDEYE$%^&0987DSDDFjb'

client = Cloudant.iam(ACCOUNT_NAME, API_KEY, connect=True)
dbname = 'coviddev_db'
cloud_db = client[dbname]


def check_for_token(func):
    @ wraps(func)
    def wrapped(*args, **kwargs):
        token = request.get_json()
        if not token['token']:
            return jsonify({"MESSAGE": "MISSING token"}), 403
        try:
            data = jwt.decode(token['token'], app.config['SECRET_KEY'])
        except jwt.exceptions.ExpiredSignatureError:
            return jsonify({"MESSAGE": "SESSION EXPIRED", "STATUS": "UNAUTHORISED"}), 403
        except jwt.exceptions.DecodeError:
            return jsonify({"MESSAGE": "INVALID token"}), 403

        return func(*args, **kwargs)
    return wrapped
  

from server.routes import *
from server.services import *

initServices(app)

if 'FLASK_LIVE_RELOAD' in os.environ and os.environ['FLASK_LIVE_RELOAD'] == 'true':
    import livereload
    app.debug = True
    server = livereload.Server(app.wsgi_app)
    server.serve(port=os.environ['port'], host=os.environ['host'])
