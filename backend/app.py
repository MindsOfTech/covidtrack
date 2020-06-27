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

#import flask app object
from server import app

if __name__ == '__main__':
    print('running environment: %s', os.environ.get('FLASK_ENV'))

    app.run(debug=True)

'''
"""
    With the method it won't connect to the group's Cloudant, I belive their is an issue with the password and or URL which requires the password. 
"""
user = '7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix'
password = 'da7e4ceffecb5a1c35e569bb68652987bb443c0402cc4e6d3f911f1d7335b772'
url = 'https://7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix.cloudantnosqldb.appdomain.cloud'


db_name = 'coviddev_db'
client = Cloudant(user, password, url=url, connect=True)
db = client.create_database(db_name, throw_on_exists=False)


@app.route('/')
def index():
    return "hello world"
    # return render_template('index.html')


@app.route('/api/users', methods=['GET'])
def allusers():
    if client:
        data = jsonify(list(map(lambda doc: doc, db)))
        return data
    else:
        print('No database')
        return jsonify([])


@ app.route('/api/username', methods=['GET'])
def allUsername():
    if client:
        data = jsonify(list(map(lambda doc: doc['username'], db)))
        return data
    else:
        print('No database')
        return jsonify([])

'''
@atexit.register
def shutdown():
    client.disconnect()


