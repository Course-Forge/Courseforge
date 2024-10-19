
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
            # print(settings.GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-1.5-flash')
            
            # Parse JSON request body
            data = json.loads(request.body)
            user_message = data.get('user_message', '')
            
            # Generate bot response
            bot_text = model.generate_content(user_message)
            bot_response = bot_text.text  # Correctly access the response text

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

def list_messages(request):
    messages = ChatMessage.objects.all()
    messages_list = [{'user_message': msg.user_message, 'bot_response': msg.bot_response} for msg in messages]
    return JsonResponse({'messages': messages_list})

@csrf_exempt
def generate_course_summary(request):
    if request.method == 'POST':
        try:
            # Parse JSON request body
            data = json.loads(request.body)
            course_description = data.get('course_description', '')
            model = genai.GenerativeModel('gemini-1.5-flash')
            # Generate summary for the course description
            summary_text = model.generate_content(course_description)
            summary_response = summary_text.text  # Access the summary response text

            # Return the generated summary in the response
            return JsonResponse({'summary': summary_response})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print(f"An error occurred while generating summary: {e}")
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


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
