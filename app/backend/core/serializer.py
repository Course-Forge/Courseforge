from rest_framework import serializers
from . models import *
  
class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = ["record", "token", "timestamp"]