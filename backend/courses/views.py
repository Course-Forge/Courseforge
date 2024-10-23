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

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import google.generativeai as genai
# import os
# from django.conf import settings

# # Configure the Google Generative AI library with your API key
# genai.configure(api_key=settings.GEMINI_API_KEY)  # Gets the API key from environment variables

# @csrf_exempt
# def course_chat(request):
#     if request.method == "POST":
#         user_input = request.POST.get("message")  # Extract the user's input message from the POST request

#         # Check if user_input is empty or None
#         if not user_input:
#             return JsonResponse({"error": "User input cannot be empty."}, status=400)

#         try:
#             # Initialize the model
#             model = genai.GenerativeModel("gemini-1.5-flash")

#             # Make the API request to generate content
#             response = model.generate_content(user_input)

#             # Check if the response is valid and contains the text
#             if response and response.text:
#                 generated_text = response.text
#             else:
#                 generated_text = "No response from the AI."

#             # Return the response back to the frontend as a JSON object
#             return JsonResponse({"response": generated_text}, status=200)
        
#         except Exception as e:
#             # Log or handle any exceptions
#             print(f"Gemini API Error: {e}")
#             return JsonResponse({"error": "Failed to get a response from Gemini API."}, status=500)

#     # Return a method not allowed error if the request method is not POST
#     return JsonResponse({"error": "Method not allowed."}, status=405)


# views.py
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from openai import OpenAI
# import json
# import os
# # Takes the environment variable API Key
# ai_client = OpenAI(api_key=os.environ["openai_key"])
# print (os.environ["openai_key"]) 
# @csrf_exempt
# def chatbot_response(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         user_message = data['message']

#         messages = [
#             {"role": "user", "content": user_message},
#         ]
#         chat_completion = ai_client.chat.completions.create(
#             messages=messages,
#             model="gpt-3.5-turbo"
#         )
#         bot_response = chat_completion.choices[0].message.content

#         return JsonResponse({'message': bot_response})
#     else:
#         return JsonResponse({'error': 'Invalid request'}, status=400)

# from django.shortcuts import render, reverse
# from django.contrib.auth.decorators import login_required
# from django.http import HttpResponseRedirect, JsonResponse
# import google.generativeai as genai
# import os

# # Create your views here.
# # add here to your generated API key
# genai.configure(api_key=os.environ["GEMINI_API_KEY"])
# print (os.environ["GEMINI_API_KEY"]) 
# @login_required
# def chatbot(request):
#     if request.method == "POST":
#         text = request.POST.get("text")
#         model = genai.GenerativeModel("gemini-pro")
#         chat = model.start_chat()
#         bot_response = chat.send_message(text)
#         user = request.user
#         ChatBot.objects.create(text_input=text, gemini_output=bot_response.text, user=user)
#         # Extract necessary data from response
#         response_data = {
#             "text": bot_response.text,  # Assuming response.text contains the relevant response data
#             # Add other relevant data from response if needed
#         }
#         return JsonResponse({"data": response_data})
#     else:
#         return HttpResponseRedirect(
#             reverse("chat")
#         )  # Redirect to chat page for GET requests

# @login_required
# def chat(request):
#     user = request.user
#     chats = ChatBot.objects.filter(user=user)
#     return render(request, "chat_bot.html", {"chats": chats})

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import requests
# import json
# import os

# # Takes the environment variable for the Gemini API Key
# gemini_api_key = os.environ.get("GEMINI_API_KEY")
# print(gemini_api_key)
# @csrf_exempt
# def chatbot_response(request):
#     if request.method == 'POST':
#         print("HELLO WORLD!!!!")
#         try:
#             data = json.loads(request.body)
#             user_message = data['message']

#             # Define payload for the Gemini API
#             payload = {
#                 "input": user_message,
#                 "model": "gemini-default"  # Replace with the correct model if applicable
#             }

#             # Headers for the request
#             headers = {
#                 "Authorization": f"Bearer {gemini_api_key}",
#                 "Content-Type": "application/json"
#             }
#             print("Hello World!")

#             # Send the request to the Gemini API
#             response = requests.post("https://api.gemini.com/v1/chat", headers=headers, json=payload)  # Directly specify endpoint

#             # Check if the response from Gemini API is successful
#             # response.status_code == 200:
#             print(response.status_code)
#             bot_response = response.json().get('response', 'I am sorry, I didn\'t get that.')
#             print("HELLO WORLD!!!!")
#             return JsonResponse({'message': bot_response})
#             # else:
#             #     # Handle error from the Gemini API
#             #     return JsonResponse({'error': f"Gemini API Error: {response.json().get('error', 'Unknown error')}"}, status=response.status_code)

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)
#     else:
#         return JsonResponse({'error': 'Invalid request'}, status=400)

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from .models import ChatMessage
# import google.generativeai as genai
# import json
# import os
# from django.conf import settings

# @csrf_exempt
# def chatbot_response(request):
#     if request.method == 'POST':
#         try:
#             # Configure the generative AI client
#             genai.configure(api_key=settings.GEMINI_API_KEY)
#             # print(settings.GEMINI_API_KEY)
#             model = genai.GenerativeModel('gemini-1.5-flash')
            
#             # Parse JSON request body
#             data = json.loads(request.body)
#             user_message = data.get('user_message', '')
            
#             # Generate bot response
#             bot_text = model.generate_content(user_message)
#             bot_response = bot_text.text  # Correctly access the response text

#             # Save message to the database
#             ChatMessage.objects.create(user_message=user_message, bot_text=bot_response)

#             # Return JSON response with the bot's response
#             return JsonResponse({'response': bot_response})  # Match the key expected in React

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#         except Exception as e:
#             print(f"An error occurred: {e}")  # Log the error for debugging
#             return JsonResponse({'error': str(e)}, status=500)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)

# def list_messages(request):
#     messages = ChatMessage.objects.all()
#     messages_list = [{'user_message': msg.user_message, 'bot_response': msg.bot_response} for msg in messages]
#     return JsonResponse({'messages': messages_list})



# from .gpt_services import get_chatbot_response
# import json

# @csrf_exempt
# def chatbot_response(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             user_message = data.get('message', '')
#             response = get_chatbot_response(user_message)
#             return JsonResponse({'response': response})
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)
#     return JsonResponse({'error': 'Invalid request method'}, status=405)




from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ChatMessage
import google.generativeai as genai
import json
import os
from django.conf import settings

@csrf_exempt
def chatbot_response(request):
    if request.method == 'POST':
        try:
            # Configure the generative AI client
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-1.5-flash')
            
            # Parse JSON request body
            data = json.loads(request.body)
            user_message = data.get('user_message', '')

            # Prompt engineering for better course summary
            prompt = f"Generate a detailed course plan for the following topic: {user_message}. Provide the following details: \
                      1. A general summary of the course. Mention what the course will cover generally. (should be quite short in about 4-5 organized sentences.)\
                      2. Also simply say how many days the course will take after a couple of spaces like this: Example: Course Duration: 10-15 days."
             

            # Generate bot response using the engineered prompt
            bot_text = model.generate_content(prompt)
            bot_response = bot_text.text

            # Save message to the database
            ChatMessage.objects.create(user_message=user_message, bot_text=bot_response)

            # Return JSON response with the bot's response
            return JsonResponse({'response': bot_response})  # Match the key expected in React

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print(f"An error occurred: {e}")  # Log the error for debugging
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    
# @csrf_exempt
# def generate_course_summary(request):
#     if request.method == 'POST':
#         try:
#             # Configure the generative AI client
#             genai.configure(api_key=settings.GEMINI_API_KEY)
#             model = genai.GenerativeModel('gemini-1.5-flash')
            
#             # Parse JSON request body
#             data = json.loads(request.body)
#             user_message = data.get('user_message', '')

#             # Prompt engineering for better course summary
#             prompt = f"Generate a detailed course plan for the following topic: {user_message}. Provide the following details: \
#                       1. A general summary of the course. Mention what the course will cover generally. (should be quite short in about 4-5 organized sentences.)\
#                       2. Also simply say how many days the course will take after a couple of spaces like this: Example: Course Duration: 10-15 days."
             

#             # Generate bot response using the engineered prompt
#             bot_text = model.generate_content(prompt)
#             bot_response = bot_text.text

#             # Save message to the database
#             ChatMessage.objects.create(user_message=user_message, bot_text=bot_response)

#             # Return JSON response with the bot's response
#             return JsonResponse({'response': bot_response})  # Match the key expected in React

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#         except Exception as e:
#             print(f"An error occurred: {e}")  # Log the error for debugging
#             return JsonResponse({'error': str(e)}, status=500)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)

#  2. How long the course might take (in days or weeks). \
#                       3. A breakdown of what to do on a daily or weekly basis."

# def list_messages(request):
#     messages = ChatMessage.objects.all()
#     messages_list = [{'user_message': msg.user_message, 'bot_response': msg.bot_response} for msg in messages]
#     return JsonResponse({'messages': messages_list})

# @csrf_exempt
# def generate_course_summary(request):
#     if request.method == 'POST':
#         try:
#             # Parse JSON request body
#             data = json.loads(request.body)
#             course_description = data.get('course_description', '')
#             model = genai.GenerativeModel('gemini-1.5-flash')
#             prompt = f"Generate a quick two to three word summary description based on this: {course_description}"
                     
#             # Generate summary for the course description
#             summary_text = model.generate_content(prompt)
#             summary_response = summary_text.text  # Access the summary response text

#             # Return the generated summary in the response
#             return JsonResponse({'summary': summary_response})

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#         except Exception as e:
#             print(f"An error occurred while generating summary: {e}")
#             return JsonResponse({'error': str(e)}, status=500)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)

