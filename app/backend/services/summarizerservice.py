import openai
import os
import os.path
import sys

from dotenv import load_dotenv
load_dotenv()

sys.path.append("../")

from services.backend.transcribe_summarize import *
from services.backend.api_02 import *

openai.api_key = os.getenv("openai_key")

class SummarizerService():

    @staticmethod
    def transcribe(filepath):

        audio_url = upload(filepath)
        transcription = save_transcript(audio_url, 'input')

        return transcription

    @staticmethod
    def summarize(text, choice, level):

        summary = summarize(text, choice, level)
        return summary
