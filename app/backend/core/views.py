# Create your views here.
from rest_framework.decorators import api_view

from . models import *
from . forms import *
from rest_framework import viewsets

from rest_framework.response import Response
from . serializer import *
from django.http import HttpResponse

import os
import os.path
import sys

sys.path.append("../")

from services.summarizerservice import SummarizerService

# Create your views here.

@api_view(['POST', 'GET'])
def handleFiles(request):

    if request.method == "POST":
        record = request.data["record"]
        token = request.data["token"]
        new_audio = Audio(record=record, token = token)
        new_audio.save()

        try:
            token = request.data["token"]
            audio_clip = Audio.objects.get(token = token)
        except Audio.DoesNotExist:
            return Response({"message": "record not found"}, status=404)

        filepath = audio_clip.record.path
        transcription = SummarizerService.transcribe(filepath)

        return Response(transcription)

    elif request.method == "GET":

        detail = [ {"token": detail.token,"timestamp": detail.timestamp} 
        for detail in Audio.objects.all()]
        return Response(detail)
    
@api_view(['POST'])
def postHandle2(request):
    if request.method == "POST":
        try:
            transcribe = request.data["transcript"]
        except Audio.DoesNotExist:
            return Response({"message": "record not found"}, status=404)

        if transcribe == "":
        
            return HttpResponse( 'SummaryArea.js', messageAlert='You must upload and transcribe the file first before summarizing!')

        choice = request.data["choice"]
        level = request.data["level"]
        if level == "defaultLevel":
            level = "highschool"
        if choice == "default":
            choice = "short"

        result = SummarizerService.summarize(transcribe, choice, level)

        return Response(result)