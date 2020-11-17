from flask import Flask, request
from flask_restx import Resource, Api, fields
from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from server import app, cloud_db, api, messagetitle


messageModel = api.model('Message Model', {
    'Message': fields.String(description='User message')})


authenticator = IAMAuthenticator('')
assistant = AssistantV2(version='2020-04-01', authenticator=authenticator)
assistant.set_service_url('')


@messagetitle.route('/post')
class postMEndpoint(Resource):
    @api.expect(messageModel)
    @api.response(201, 'Success')
    @api.response(404, 'USER NOT FOUND')
    def post(self):
        try:
            genSessionKey = assistant.create_session(
                assistant_id='').get_result()
            response = assistant.message(assistant_id='', session_id=genSessionKey['session_id'], input={
                                         'message_type': 'text', 'text': request.json['Message']}).get_result()
            return {'result': response}, 201
        except:
            return {'message': 'error'}, 400
