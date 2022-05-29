from googleapiclient.discovery import build
from oauth2client import file, client
import datetime

calendar_id = 'jjsantosochoa@gmail.com'


def get_service(token):
    credentials = client.AccessTokenCredentials(
        token,
        'my-calendar-bot/1.0',
    )

    service = build('calendar', 'v3', credentials=credentials)
    return service


def get_event_by_datetime(date_time, service):
    page_token = None
    time_min = (date_time - datetime.timedelta(minutes=5)).strftime('%Y-%m-%dT%H:%M:%S-05:00')
    time_max = (date_time + datetime.timedelta(minutes=5)).strftime('%Y-%m-%dT%H:%M:%S-05:00')
    events = service.events().list(calendarId=calendar_id, pageToken=page_token, timeMin=time_min, timeMax=time_max).execute()
    next_event = events['items'][0]
    return next_event


def get_users_in_event(event):
    usuarios_reunion = [u.strip() for u in event['summary'].split(':')[1]]
    return usuarios_reunion


def update_event_summary(event, user_origin, user_dest, service):
    evento = service.events().get(calendarId=calendar_id, eventId=event['id']).execute()
    ahora = datetime.datetime.now()
    usuarios_reunion = [u.strip() for u in evento['summary'].split(':')[1] if user_origin not in u]
    new_usuario = f'{user_dest} (en reemplazo de {user_origin})'
    usuarios_reunion.append(new_usuario)
    evento['summary'] = f'chat: {",".join(usuarios_reunion)}'
    updated_event = service.events().update(calendarId='primary', eventId=evento['id'], body=evento).execute()
    print(updated_event['updated'])
