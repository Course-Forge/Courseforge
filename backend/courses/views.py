# courses/views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# import requests
# from django.conf import settings

# class CourseViewSet(APIView):
#     def post(self, request, *args, **kwargs):
#         user_message = request.data.get('message')
#         if not user_message:
#             return Response({"error": "No message provided"}, status=status.HTTP_400_BAD_REQUEST)

#         # Correct Gemini API endpoint and headers
#         gemini_api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"
#         headers = {
#             'Authorization': f'Bearer {settings.GEMINI_API_KEY}',  # Use the correct API key from settings
#             "Content-Type": "application/json",
#         }
#         data = {"prompt": {"text": user_message}}

#         try:
#             gemini_response = requests.post(gemini_api_url, headers=headers, json=data)
#             gemini_response.raise_for_status()  # Raise an error for any 4xx/5xx status codes
#             gemini_message = gemini_response.json().get("text")
#         except requests.exceptions.RequestException as e:
#             # Log error to see what went wrong
#             print(f"Error making request to Gemini API: {e}")
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         return Response({
#             "user_message": user_message,
#             "gemini_message": gemini_message
#         }, status=status.HTTP_200_OK)

# views.py
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import requests
# import os
# import json
# from django.conf import settings;
# @csrf_exempt  # This is necessary if you're making requests from a different domain (like localhost frontend)
# def course_chat(request):
#     if request.method == 'POST':
#         try:
#             # Get the message from the request body
#             data = json.loads(request.body)
#             user_message = data.get('message', '')

#             # Gemini API URL and headers
#             gemini_api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'
#             gemini_api_key = settings.GEMINI_API_KEY  # Ensure this is set in your environment

#             headers = {
#                 'Authorization': f'Bearer {gemini_api_key}',
#                 'Content-Type': 'application/json',
#             }

#             # Request body for Gemini API
#             payload = {
#                 "input": user_message  # Adjust payload as required by Gemini API
#             }

#             # Make the request to the Gemini API
#             response = requests.post(gemini_api_url, headers=headers, json=payload)

#             # Check for HTTP errors
#             response.raise_for_status()
            
#             # Parse the response from the Gemini API
#             gemini_response = response.json()

#             # Assume 'output' is the correct field for the model's response
#             return JsonResponse({'message': gemini_response.get('output', 'No response received.')})

#         except requests.exceptions.HTTPError as err:
#             print(f"HTTP error occurred: {err}")
#             return JsonResponse({'error': str(err)}, status=500)

#         except Exception as e:
#             print(f"Other error occurred: {e}")
#             return JsonResponse({'error': 'An unexpected error occurred.'}, status=500)

#     return JsonResponse({'error': 'Invalid request method.'}, status=405)

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import requests
# import json
# from django.conf import settings

# @csrf_exempt  # Allow requests from different domains (like your React frontend)
# def course_chat(request):
#     if request.method == 'POST':
#         try:
#             # Extract the message from the request body
#             data = json.loads(request.body)
#             user_message = data.get('message', '')

#             # Gemini API URL and headers
#             gemini_api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'
#             gemini_api_key = settings.GEMINI_API_KEY  # Ensure you have this in your settings
#             print("Gemini API Key:", gemini_api_key)  

#             headers = {
#                 'Authorization': f'Bearer {gemini_api_key}',
#                 'Content-Type': 'application/json',
#             }

#             # Prepare the payload for the Gemini API request
#             payload = {
#                 "prompt": user_message,  # Using user's message as a prompt
#                 "max_tokens": 50,  # Adjust this as needed for response length
#                 "temperature": 0.7,  # Adjust creativity level
#             }

#             # Send the request to the Gemini API
#             gemini_response = requests.post(gemini_api_url, headers=headers, json=payload)

#             # Check if the response from Gemini API is successful
#             if gemini_response.status_code == 200:
#                 gemini_data = gemini_response.json()
#                 ai_response = gemini_data.get('choices', [{}])[0].get('text', 'I could not process your input.')

#                 # Send the AI response back to the frontend
#                 return JsonResponse({"message": ai_response}, status=200)
#             else:
#                 # Handle error from Gemini API
#                 return JsonResponse({"error": "Failed to get a response from Gemini API."}, status=gemini_response.status_code)

#         except Exception as e:
#             # Handle any unexpected errors
#             return JsonResponse({"error": str(e)}, status=500)
#     else:
#         return JsonResponse({"error": "Invalid request method."}, status=405)




# import os
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import requests
# from django.conf import settings
# from google import go

# @csrf_exempt
# def course_chat(request):
#     if request.method == 'POST':
#         gemini_api_key = settings.GEMINI_API_KEY
#         # Debugging: Print the API key to check if it's set
#         print("Gemini API Key:", gemini_api_key)  

#         if not gemini_api_key:
#             return JsonResponse({"error": "GEMINI API key is not set."}, status=401)

#         # Prepare the request
#         user_message = request.POST.get('message')
#         gemini_api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

#         headers = {
#             'Authorization': f'Bearer {gemini_api_key}',
#             'Content-Type': 'application/json',
#         }
        
#         body = {
#             "prompt": user_message
#         }

#         # Send the request
#         response = requests.post(gemini_api_url, headers=headers, json=body)

#         # Check response status
#         if response.status_code == 200:
#             data = response.json()
#             # Assuming the response contains the text under 'content'
#             return JsonResponse({"response": data.get('content', 'No response from Gemini.')}, status=200)
#         else:
#             # Debugging: Print the response content for further inspection
#             print("Gemini API Error:", response.status_code, response.text)
#             return JsonResponse({"error": "Failed to get a response from Gemini API."}, status=401)
    
#     else:
#         return JsonResponse({"error": "Invalid request method."}, status=405)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import google.generativeai as genai
import os
from django.conf import settings

# Configure the Google Generative AI library with your API key
genai.configure(api_key=settings.GEMINI_API_KEY)  # Gets the API key from environment variables

@csrf_exempt
def course_chat(request):
    if request.method == "POST":
        user_input = request.POST.get("message")  # Extract the user's input message from the POST request

        # Check if user_input is empty or None
        if not user_input:
            return JsonResponse({"error": "User input cannot be empty."}, status=400)

        try:
            # Initialize the model
            model = genai.GenerativeModel("gemini-1.5-flash")

            # Make the API request to generate content
            response = model.generate_content(user_input)

            # Check if the response is valid and contains the text
            if response and response.text:
                generated_text = response.text
            else:
                generated_text = "No response from the AI."

            # Return the response back to the frontend as a JSON object
            return JsonResponse({"response": generated_text}, status=200)
        
        except Exception as e:
            # Log or handle any exceptions
            print(f"Gemini API Error: {e}")
            return JsonResponse({"error": "Failed to get a response from Gemini API."}, status=500)

    # Return a method not allowed error if the request method is not POST
    return JsonResponse({"error": "Method not allowed."}, status=405)
