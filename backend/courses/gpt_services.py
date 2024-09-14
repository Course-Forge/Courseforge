# gpt_service.py
import openai
from django.conf import settings

# Load your API key from environment variables or Django settings
openai.api_key = settings.OPENAI_API_KEY

def get_chatbot_response(user_message):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # Specify the GPT model to use
            messages=[{"role": "user", "content": user_message}],
            max_tokens=150,
            temperature=0.7
        )
        return response.choices[0].message["content"]
    except Exception as e:
        print(f"Error communicating with OpenAI API: {e}")
        return "Sorry, I couldn't process your request at the moment."
