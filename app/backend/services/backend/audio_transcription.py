import requests
from api_02 import *

filename = "sister_recording.mp3"
audio_url = upload(filename)

save_transcript(audio_url, 'file_title')