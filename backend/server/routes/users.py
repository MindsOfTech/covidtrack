from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException
from cloudant.client import Cloudant
from cloudant.query import Query

# pull in Flask and database instance
from server import app, cloud_db, check_for_token


@app.route('/signup', methods=['POST'])
def newuser():
    # Postman test http://127.0.0.1:5000/user?id=jrichard&password=testpassword&fname=James&lname=Richard&number=7839871234&parish=St. James
    if request.method == 'POST':

        userdata = request.get_json()
        userdata['_id'] = userdata['user']
        userdata['type'] = 'user'
        new_doc = cloud_db.create_document(userdata)

        return jsonify({'ok': True, 'message': 'User created successfully!'}), 200


@app.route('/user', methods=['GET', 'DELETE', 'PATCH'])
@check_for_token
def user():
    userdata = request.get_json()
    if request.method == 'GET':
        # Postman test http://127.0.0.1:5000/user?id=cricketts
        return jsonify(cloud_db[userdata['user']])

    if request.method == 'DELETE':
        # if userdata['user'] is not None:
        try:
            doc_exist = userdata['user'] in cloud_db
            mydoc = cloud_db[userdata['user']]
            mydoc.delete()
            response = {'ok': True, 'message': 'record deleted'}
            return jsonify(response), 200

        except:
            response = {'ok': True, 'message': 'no record found'}
            return jsonify(response), 200

    # update user

    if request.method == 'PATCH':
        if userdata.get('id', {}) != {}:
            mydoc = cloud_db[userdata.get('id')]
            del userdata['id']

            fields = list(userdata.keys())
            for field in fields:
                mydoc[field] = userdata.get(field)

            mydoc.save()
            return jsonify({'ok': True, 'message': 'record updated'}), 200

        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400
