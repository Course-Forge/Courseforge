from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Course
from .serializers import CourseSerializer
import requests
class CourseViewSet(APIView):
    def post(self, request, *args, **kwargs):
        user_message = request.data.get('message')
        if not user_message:
            return Response({"error": "No message provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Save user message to the database
        user_msg = Course.objects.create(sender='user', text=user_message)

        # Call Gemini API (replace with actual Gemini API endpoint and key)
        gemini_api_url = "https://api.gemini.com/v1/chat"
        gemini_api_key = ".env.GEMINI_API_KEY"
        headers = {
            "Authorization": f"Bearer {gemini_api_key}",
            "Content-Type": "application/json",
        }
        data = {"message": user_message}
        gemini_response = requests.post(gemini_api_url, headers=headers, json=data)

        if gemini_response.status_code != 200:
            return Response({"error": "Failed to get response from Gemini API"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        gemini_message = gemini_response.json().get("response")
        # Save Gemini response to the database
        bot_msg = Course.objects.create(sender='gemini', text=gemini_message)

        return Response({
            "user_message": CourseSerializer(user_msg).data,
            "gemini_message": CourseSerializer(bot_msg).data
        }, status=status.HTTP_200_OK)

# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from rest_framework.exceptions import ValidationError
# from .models import Course
# from .serializers import CourseSerializer
# import requests
# from django.conf import settings

# class CourseViewSet(viewsets.ModelViewSet):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer

#     def create(self, request, *args, **kwargs):
#         # Validate the incoming request
#         serializer = self.get_serializer(data=request.data)
#         try:
#             serializer.is_valid(raise_exception=True)
#         except ValidationError as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#         # Save the course to the database
#         self.perform_create(serializer)
#         course = serializer.instance

#         # Call Gemini API to enhance the description
#         try:
#             gemini_response = requests.post(
#                 'https://api.gemini.com/enhance',
#                 json={
#                     'title': course.title,
#                     'description': course.description
#                 },
#                 headers={
#                     'Authorization': f'Bearer {settings.GEMINI_API_KEY}',
#                     'Content-Type': 'application/json'
#                 }
#             )
#             gemini_response.raise_for_status()  # Raise an HTTPError for bad responses
#         except requests.RequestException as e:
#             course.delete()  # Rollback course creation if the Gemini API call fails
#             return Response({'error': f'Failed to enhance the description: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # Process the Gemini API response
#         gemini_data = gemini_response.json()
#         enhanced_description = gemini_data.get('enhanced_description', '')

#         if not enhanced_description:
#             course.delete()  # Rollback course creation if the enhanced description is not provided
#             return Response({'error': 'Gemini API did not return an enhanced description'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # Save the enhanced description and day one content
#         course.enhanced_description = enhanced_description
#         course.day_one_content = "Day One Content: Projects, Assignments, Code Snippets, Lectures."
#         course.save()

#         # Return the response data including the enhanced description and day one content
#         response_data = serializer.data
#         response_data['enhanced_description'] = enhanced_description
#         response_data['day_one_content'] = course.day_one_content

#         return Response(response_data, status=status.HTTP_201_CREATED)
