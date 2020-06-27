from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.error import CloudantException

from server import app, cloud_db #pull in Flask and database instance

@app.route('/user', methods=['GET', 'POST', 'DELETE', 'PATCH'])

def user():
	if request.method == 'GET':
		#Postman test http://127.0.0.1:5000/user?id=cricketts
		query = request.args.get('id')

		#return jsonify(list(cloud_db))
		return jsonify(cloud_db[query])

	#Postman test http://127.0.0.1:5000/user?id=jrichard&password=testpassword&fname=James&lname=Richard&number=7839871234&parish=St. James
	
	if request.method == 'POST':
		
		usrnm = request.args.get('id')
		passwrd = request.args.get('password')
		fname = request.args.get('fname')
		lname = request.args.get('lname')
		parish = request.args.get('parish')
		number = request.args.get('number')

		'''
		#code to convert query url to dictionary
		all_args = request.args.to_dict()
		return jsonify(all_args)
		'''
		json_doc = {
			"_id": usrnm,
			"password": passwrd,
			"first_name": fname,
			"last_name": lname,
			"number": number,
			"parish": parish,
			"type:": "user"
		}

		new_doc = cloud_db.create_document(json_doc)
		return jsonify({'ok': True, 'message': 'User created successfully!'}), 200
		
		

	if request.method == 'DELETE':
		#query = request.args.get('id', None)
		query = request.args.get('id', None)
		if query is not None:
			try:
				doc_exist = query in cloud_db
			except CloudantException:
				response = {'ok': True, 'message': 'no record found'}
				return jsonify(response), 200
			else:
				mydoc = cloud_db[query]
				mydoc.delete()
				response = {'ok': True, 'message': 'record deleted'}
				return jsonify(response), 200
		else:
			return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

	#update user
	data = request.get_json()
	if request.method == 'PATCH':

		if data.get('id', {}) != {}:
			mydoc = cloud_db[data.get('id')]
			del data['id']

			fields = list(data.keys())
			for field in fields:
				mydoc[field] = data.get(field)

			mydoc.save()
			return jsonify({'ok': True, 'message': 'record updated'}), 200

		else:
			return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

