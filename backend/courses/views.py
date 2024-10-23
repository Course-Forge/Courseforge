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
    