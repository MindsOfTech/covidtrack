from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result

"""
    Team: Backend
    Call for code Team: MindsOfTech 
"""


# IBM Cloudant credentials.
pyusr = "7e89eed1-ada0-47e1-b1d0-2e72dbcf1c45-bluemix"
pypsswrd = "da7e4ceffecb5a1c35e569bb68652987bb443c0402cc4e6d3f911f1d7335b772"
pyapikey = "4fkmluaOyQ2khPzOTwtZnIZDNCsNEtRbfqae_wuZsWVA"

# Connection to IBM Cloudant
client = Cloudant.iam(pyusr, pyapikey, connect=True)
client.connect()

'''
#Create new database
databaseName = "databasedemo"
myDatabaseDemo = client.create_database(databaseName)

if myDatabaseDemo.exists():
    print("'{0}' successfully created.\n".format(databaseName))
'''


# Test connection to Cloudent db.
def connectionTest(db):
    try:
        db_name = db
        told = client[db_name]
    except:
        print(f" '{db_name}' NOT FOUND ")
    else:
        print(f" '{db_name}' FOUND")


connectionTest('coviddev_db')

db = client['coviddev_db']

