import json
from flask import Flask, render_template, jsonify
from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

app = Flask(__name__)
# Watson Credentials
url = 'https://api.us-east.assistant.watson.cloud.ibm.com/instances/433cd919-fcaa-4415-9bd7-ab1c316d367c'
iam_apykey = 'ZRFX-C5GuFKc7ttnRnjEIROl4ObPT6sFh6LbFuxokOOo'

# Creating a connection to watson using 'AssistantV2'
authenticator = IAMAuthenticator(iam_apykey)
assistant = AssistantV2(version='2020-04-01', authenticator=authenticator)
assistant.set_service_url(url)

# Starting the session to watson
session = assistant.create_session(
    '0a067217-7f9d-43ff-a85b-434689c8ad2a').get_result()


varibles = None


@app.route('/comm/<message>')
def comm(message):
    text = ''
    responce = assistant.message(
        assistant_id='0a067217-7f9d-43ff-a85b-434689c8ad2a',
        session_id=session['session_id'],
        input={'text': str(message), 'options': {
            'return_context': True}}
    ).get_result()
    varibles = responce['output'].get('user_defined')
    for i in responce['output']['generic']:
        text = text+i['text']+'\n'
        return text


@app.route('/endsession')
def deleteSession():
    response = assistant.delete_session(
        assistant_id='0a067217-7f9d-43ff-a85b-434689c8ad2a',
        session_id=session['session_id']
    ).get_result()
    return response


if __name__ == '__main__':
    app.run(debug=True)
