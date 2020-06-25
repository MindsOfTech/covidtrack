from flask import Flask, render_template, request, jsonify, json, redirect
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result


app = Flask(__name__)

ACCOUNT_NAME = "7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix"
API_KEY = "8GlK-4CkdvhsteVdNIGfvEQEifYk5YiyXZpAoVzIEd9w"
URL = "https://7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix.cloudantnosqldb.appdomain.cloud"

# Connection to Cloudant DB
client = Cloudant.iam(ACCOUNT_NAME, API_KEY, connect=True)


# Cloudant DB name
db_name = 'coviddev_db'


mydb = client.create_database(db_name)

""" # GENERATE short random ID
id = uuid.uuid4() """


@app.route('/')
def home():
    if mydb.exists():
        result = request.form
        return render_template('index.html')


# CREATE DB
@app.route('/createdb/<dbname>', methods=['GET', 'POST'])
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
def removeDB(dbname):
    try:
        client.delete_database(dbname)
    except CloudantException:
        return(f"There was an error DELETING : '{dbname}'")
    else:
        return(f" '{dbname}' was DELETED")


# CREATE DOCUMENT
@app.route('/add', methods=['POST'])
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
def opendb(id):
    doc_exist = id in mydb
    if doc_exist:
        return (f"document with ID: '{mydb[id]}' exists")
    else:
        return("ERROR")


# UPDATES/ ADDES NAME by _id
@app.route('/updateuser/<id>/<username>', methods=['GET', 'PUT'])
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
def deleteUser(id):
    try:
        doc_exist = id in mydb
    except CloudantException:
        return(f"ERROR DELETING USER WITH : '{id}' ID ")
    else:
        mydoc = mydb[id]
        mydoc.delete()
        return (f" USER WITH '{id}' WAS DELETED")


# LOGIN verification by _id
@app.route('/login', methods=['GET', 'POST'])
def login():
    id = request.form['username']
    password = request.form['password']
    doc_exist = id in mydb
    if doc_exist:
        mydoc = mydb[id]
        if password == mydoc['PASSWORD']:
            return (f" Mr. '{mydoc['FULLNAME']}' HAS THE FOLLOWING '{mydoc['QUALIFICATION']}'")
        else:
            return ("INCORRECT PASSWORD")
    else:
        return (f"USER '{id}' NOT FOUND ")


if __name__ == "__main__":
    app.run(debug=True)
