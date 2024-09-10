from django.db import models

# Create your models here.
class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)

def upload_path(instance, filename):
    path = "/".join(["audio", filename])
    return path

class Audio(models.Model):
    record = models.FileField(upload_to = upload_path)
    token = models.CharField(max_length=32, blank = False, null = True)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)