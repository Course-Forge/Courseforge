from django.shortcuts import render
from rest_framework import viewsets
from courses.models import Course, Project
from courses.serializers import CourseSerializer, ProjectSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
# Create your views here.
