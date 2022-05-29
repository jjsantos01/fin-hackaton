import requests

prod = False
host = 'https://lit-dusk-60294.herokuapp.com/' if prod else 'http://127.0.0.1:5000/'
endpoint = f'{host}/api/v1/change-shift'


def send_post(user: str, date: str, time: str):
    data = {"user": user, "date": date, "time": time}
    resp = requests.post(endpoint, data=data)
    print(resp)

data = {
  "user": "juan",
  "date": "Martes, 31 de mayo",
  "time": "12:00 – 1:30pm"
}

send_post(**data)
