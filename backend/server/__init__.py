import os
from flask import Flask, abort, session, request, redirect
from flask.json import jsonify
from cloudant.client import Cloudant
from functools import wraps
from flask_restx import Resource, Api, apidoc
import jwt

app = Flask(__name__, template_folder="../public",
            static_folder="../public", static_url_path='')


app.config.SWAGGER_UI_DOC_EXPANSION = 'list'


def default_id(resource, method):
    return ''.join((method, resource))


api = Api(app, default_id=default_id, version='1.0',
          title='Covy\'s API', description='Endpoint for our covy app')

logtitle = api.namespace('Log')
usertitle = api.namespace('Users')
companytitle = api.namespace('Company')
symptomstitle = api.namespace('Symptoms')

app.config['SWAGGER_UI_JSONEDITOR'] = True

ACCOUNT_NAME = ""
API_KEY = ""
app.config['SECRET_KEY'] = ''


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


from server.services import *
from server.routes import *

initServices(app)

if 'FLASK_LIVE_RELOAD' in os.environ and os.environ['FLASK_LIVE_RELOAD'] == 'true':
    import livereload
    app.debug = True
    server = livereload.Server(app.wsgi_app)
    server.serve(port=os.environ['port'], host=os.environ['host'])
