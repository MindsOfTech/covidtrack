from server import app
from cloudant import Cloudant
from cloudant.result import Result
from flask import Flask, render_template, request, jsonify, url_for, json
import atexit
import os
import sys
import json

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'server'))

# import flask app object

if __name__ == '__main__':
    print('running environment: %s', os.environ.get('FLASK_ENV'))
    app.run(debug=True)


@atexit.register
def shutdown():
    client.disconnect()
