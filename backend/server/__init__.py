import os
from flask import Flask, abort, session, request, redirect
from flask.json import jsonify
from cloudant.client import Cloudant

app = Flask(__name__, template_folder="../public", static_folder="../public", static_url_path='')

ACCOUNT_NAME = "7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix"
API_KEY = "8GlK-4CkdvhsteVdNIGfvEQEifYk5YiyXZpAoVzIEd9w"
URL = "https://7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix.cloudantnosqldb.appdomain.cloud"

client = Cloudant.iam(ACCOUNT_NAME, API_KEY, connect=True)
dbname = 'coviddev_db'
cloud_db = client[dbname]

from server.routes import *
from server.services import *

initServices(app)

if 'FLASK_LIVE_RELOAD' in os.environ and os.environ['FLASK_LIVE_RELOAD'] == 'true':
	import livereload
	app.debug = True
	server = livereload.Server(app.wsgi_app)
	server.serve(port=os.environ['port'], host=os.environ['host'])
