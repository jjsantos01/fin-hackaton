from flask import Flask, request, jsonify
from config import config
from flask_cors import CORS, cross_origin
import random
import dateparser
from calendar_api import get_service, get_event_by_datetime, update_event_summary, get_users_in_event


def create_app(enviroment):
    app = Flask(__name__)
    app.config.from_object(enviroment)
    return app


token = "ya29.a0ARrdaM8Icw-MEhbl3bCPdE-0czmGcIpu5t2c4uLykzzbixxxfnR4RbpSo-A0_mK_qRCZdHZJAM_EQhidB74RqV_fBp1KZ_V0nx7LQG4ez5H4B0iVU-1raB25csc63bsm_M6buQDz6EUR6WA9hoaY-IQV2Vdb"
enviroment = config['development']
app = create_app(enviroment)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def hello_world():
    response = {'message': ["Piyush", "zoe", "juan"]}
    return jsonify(response)


@app.route('/api/v1/users', methods=['GET'])
def get_users():
    response = {'message': 'success'}
    return jsonify(response)


@app.route('/api/v1/change-shift', methods=['POST'])
@cross_origin()
def request_change_shift():
    print("HOLAAAAA")
    data = request.get_json(force=True)
    user = data.get('user', 'MUNDOO')
    date = data.get('date')
    time = data.get('time')
    date_time = get_date_from_request(date, time)
    service = get_service(token)
    event = get_event_by_datetime(date_time, service)
    # available_users = find_available_users(date_time)
    # users_in_event = get_users_in_event(event)
    # available_users_not_in_event = list(set(available_users) - set(users_in_event))
    # usuario_dest = random.choice(available_users_not_in_event)
    # update_event_summary(event, user_origin=user, user_dest=usuario_dest, service=service)
    response = {'event': event}#{'name': usuario_dest}
    return jsonify(response)


def get_date_from_request(date, time):
    time = time.split('–')[0] + time[-2:]
    date_time_str = f"{date}, {time}"
    date_time = dateparser.parse(date_time_str)
    return date_time


def find_available_users(date_time):
    users = ['piyush', 'gonza', 'julio', 'jose', 'maria', 'jjso', 'fintualtest2022']
    return users


def send_change_shift_notification(email):
    pass


def receive_change_shift_decision(des):
    pass


if __name__ == '__main__':
    app.run(debug=True)