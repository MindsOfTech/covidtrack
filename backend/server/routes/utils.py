from flask import Flask, render_template, request, jsonify, json, redirect, send_from_directory
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result
import os
import sys


# import Flask object
from server import app, cloud_db, check_for_token
'''
ACCOUNT_NAME = "7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix"
API_KEY = "8GlK-4CkdvhsteVdNIGfvEQEifYk5YiyXZpAoVzIEd9w"
URL = "https://7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix.cloudantnosqldb.appdomain.cloud"


# Connection to Cloudant DB
client = Cloudant.iam(ACCOUNT_NAME, API_KEY, connect=True)


# Cloudant DB name
db_name = 'coviddev_db'


mydb = client.create_database(db_name)
'''

""" # GENERATE short random ID
id = uuid.uuid4() """


@app.route('/')
@check_for_token
def home():
    # print('heller')
    # print(TEMPLATE_PATH)
    # if mydb.exists():
    #    result = request.form
    return render_template('index.html')


# CREATE DB
@app.route('/createdb/<dbname>', methods=['GET', 'POST'])
@check_for_token
def createdb(dbname):
    try:
        db = client[dbname]
    except:
        mydb = client.create_database(dbname)
        return (f" '{dbname}' WAS CREATED")
    else:
        return (f" '{dbname}' ALREADY CREATED")


# DELETE DB
@app.route('/deletedb/<dbname>', methods=['GET', 'DELETE'])
@check_for_token
def removeDB(dbname):
    try:
        client.delete_database(dbname)
    except CloudantException:
        return(f"There was an error DELETING : '{dbname}'")
    else:
        return(f" '{dbname}' was DELETED")


# CREATE DOCUMENT
@app.route('/add', methods=['POST'])
@check_for_token
def addTask():
    if request.method == "POST":
        usrnm = request.form['username']
        passwrd = request.form['password']
        fullnm = request.form['fullname']
        qual = request.form['qualification']
        json_doc = {
            "_id": usrnm,
            "PASSWORD": passwrd,
            "FULLNAME": fullnm,
            "QUALIFICATION": qual
        }
        new_doc = mydb.create_document(json_doc)
        return ("ADD")


""" # Viewing first DOCUMENT in DB
@app.route('/all')
def getAllTask():
    result_collection = Result(mydb.all_docs, include_docs=True)
    for x in result_collection:
        return (f"'{x}'") """


# SEARCH DOCUMENT by _id
@app.route('/search/<id>', methods=['GET'])
@check_for_token
def opendb(id):
    doc_exist = id in mydb
    if doc_exist:
        return (f"document with ID: '{mydb[id]}' exists")
    else:
        return("ERROR")


# UPDATES/ ADDS NAME by _id
@app.route('/updateuser/<id>/<username>', methods=['GET', 'PUT'])
@check_for_token
def updatename(id, username):
    doc_exist = id in mydb
    if doc_exist:
        # Retrive DOCUMENT
        mydoc = mydb[id]

        # OVERRIDE NAME
        mydoc['name'] = mydoc['name'] + ' ' + username
        mydoc.save()
        return ("UPDATE WAS MADE")
    else:
        return("ERROR")


# OVERRIDE COMPLETE NAME by _id
@app.route('/updateuser/<id>/<firstname>/<lastname>', methods=['GET', 'PUT'])
@check_for_token
def overridename(id, firstname, lastname):
    doc_exist = id in mydb
    if doc_exist:
        # Retrive DOCUMENT
        mydoc = mydb[id]
        # OVERRIDE NAME
        mydoc['name'] = firstname + ' ' + lastname
        mydoc.save()
        return ("UPDATE WAS MADE")
    else:
        return("ERROR")


# DELETE DOCUMENT by _id
@app.route('/deleteuser/<id>', methods=['GET', 'DELETE'])
@check_for_token
def deleteUser(id):
    try:
        doc_exist = id in mydb
    except CloudantException:
        return(f"ERROR DELETING USER WITH : '{id}' ID ")
    else:
        mydoc = mydb[id]
        mydoc.delete()
        return (f" USER WITH '{id}' WAS DELETED")


if __name__ == "__main__":
    app.run(debug=True)
