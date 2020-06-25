import os
from flask import Flask, abort, session, request, redirect
from flask.json import jsonify

app = Flask(__name__, instance_relative_config=True)

from server.routes import *

if 'FLASK_LIVE_RELOAD' in os.environ and os.environ['FLASK_LIVE_RELOAD'] == 'true':
	import livereload
	app.debug = True
	server = livereload.Server(app.wsgi_app)
	server.serve(port=os.environ['port'], host=os.environ['host'])

#test route
@app.route('/hello')
def hello():
    return 'Hi, MindsOf Tech is working!'