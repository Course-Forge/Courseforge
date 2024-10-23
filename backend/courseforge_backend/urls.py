"""
URL configuration for courseforge_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from courses.views import chatbot_response;
# from courses.views import generate_course_summary;

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/courseforge/', course_chat, name='course_chat')
    path('api/chatbot/', chatbot_response, name='chatbot_response'),
    # path('api/generate_course_summary/', generate_course_summary, name='generate_course_summary')
]
# router = DefaultRouter()
# router.register(r'courses', CourseViewSet.as_view)

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include(router.urls)),
# ]
