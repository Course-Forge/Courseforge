# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from .models import ChatMessage
# import google.generativeai as genai
# import json
# from django.conf import settings
# # from .utils import fetch_youtube_videos

# @csrf_exempt
# def chatbot_response(request):
#     if request.method == 'POST':
#         try:
#             # Configure the generative AI client
#             genai.configure(api_key=settings.GEMINI_API_KEY)
#             model = genai.GenerativeModel('gemini-1.5-flash')
            
#             # Parse JSON request body
#             data = json.loads(request.body)
#             user_message = data.get('user_message', '')

#             # Prompts
#             summary_prompt = f"Generate a detailed course plan for the following topic: {user_message}. Provide the following details: \
#                 1. A general summary of the course. Mention what the course will cover generally. (should be quite short in about 4-5 organized sentences.)\
#                 2. Also simply say how many days the course will take after a couple of spaces like this: Example: Course Duration: 10-15 days."
#             summary_text = model.generate_content(summary_prompt).text

#             # lectures_prompt = f"Generate a lecture plan for the course topic: {user_message}. Divide the course into multiple lectures with titles and brief descriptions."
#             lectures_prompt = f"Generate the main lecture plan for Day 1 for this course prompt: {user_message}. Make it neat, detailed, and very well-explained for the user"
#             lectures_text = model.generate_content(lectures_prompt).text
            
#             # assignments_prompt = f"Generate a list of assignments for the course topic: {user_message}. Provide tasks with short descriptions."
#             assignments_prompt = f"Generate the major assignment for Day 1 for this course: {user_message}. Make it well-defined and nice for the user to understand what the assignment exactly is."
#             assignments_text = model.generate_content(assignments_prompt).text

#             quizzes_prompt = f"Create quizzes for Day 1 for the course topic: {user_message}. Include a brief title and a summary of questions covered in each quiz."
#             quizzes_text = model.generate_content(quizzes_prompt).text

#             # Fetch related YouTube videos
#             # videos = fetch_youtube_videos(settings.YOUTUBE_API_KEY, user_message)

#             # Save message to the database
#             ChatMessage.objects.create(
#                 user_message=user_message,
#                 summary_text=summary_text,
#                 lectures_text=lectures_text,
#                 assignments_text=assignments_text,
#                 quizzes_text=quizzes_text
#             )

#             # Return JSON response with the bot's response
#             return JsonResponse({
#                 'sum_response': summary_text,
#                 'lec_response': lectures_text,
#                 'assign_response': assignments_text,
#                 'quiz_response': quizzes_text
#                 # "videos": videos,
#             })

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#         except Exception as e:
#             print(f"An error occurred: {e}")  # Log the error for debugging
#             return JsonResponse({'error': str(e)}, status=500)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)















# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from .models import ChatMessage
# import google.generativeai as genai
# import json
# from django.conf import settings

# @csrf_exempt
# def chatbot_response(request):
#     if request.method == 'POST':
#         try:
#             # Configure the generative AI client
#             genai.configure(api_key=settings.GEMINI_API_KEY)
#             model = genai.GenerativeModel('gemini-1.5-flash')
            
#             # Parse JSON request body
#             data = json.loads(request.body)
#             user_message = data.get('user_message', '')

#             # Define number of days for the course (can be dynamic)
#             course_duration = 5
            
#             summary_prompt = f"Generate a detailed course plan for the following topic: {user_message}. Provide the following details: \
#                  1. A general summary of the course. Mention what the course will cover generally. (should be quite short in about 4-5 organized sentences.)\
#                  2. Also directly state what the course duration is: Example: Course Duration(in days): 5"
#             summary_text = model.generate_content(summary_prompt).text


#             # Generate course content for each day
#             course_data = {
#                 'courseName': summary_text,
#                 'days': {}
#             }

#             for day in range(1, course_duration + 1):
#                 lectures_prompt = f"Generate a detailed lecture for Day {day} of a {course_duration}-day course on {user_message}."
#                 assignments_prompt = f"Generate an assignment for Day {day} of the course on {user_message}."
#                 quizzes_prompt = f"Create quizzes for Day {day} for the course topic: {user_message}. Include a brief title and a summary of questions covered in each quiz."

#                 # AI Model call to generate content
#                 lecture_content = model.generate_content(lectures_prompt).text
#                 assignment_content = model.generate_content(assignments_prompt).text
#                 quiz_content = model.generate_content(quizzes_prompt).text

#                 # Store day's content
#                 course_data['days'][f'day{day}'] = {
#                     'lectures': lecture_content,
#                     'assignments': assignment_content,
#                     'quizzes': quiz_content
#                 }

#             # Save message to the database
#             ChatMessage.objects.create(
#                 user_message=user_message,
#                 summary_text=course_data['courseName'],
#                 lectures_text=json.dumps({day: course_data['days'][day]['lectures'] for day in course_data['days']}),
#                 assignments_text=json.dumps({day: course_data['days'][day]['assignments'] for day in course_data['days']}),
#                 quizzes_text=json.dumps({day: course_data['days'][day]['quizzes'] for day in course_data['days']})
#             )

#             # Return JSON response with the bot's response
#             return JsonResponse({'message': 'Course generated successfully', 'course_data': course_data})

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#         except Exception as e:
#             print(f"An error occurred: {e}")  # Log the error for debugging
#             return JsonResponse({'error': str(e)}, status=500)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)





from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ChatMessage
import google.generativeai as genai
import json
from django.conf import settings
import requests

YOUTUBE_API_KEY = settings.YOUTUBE_API_KEY
YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search"

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

            # Define number of days for the course (can be dynamic)
            coursedur_prompt = f"ONLY output the number of days this course: {user_message} will take to complete. Only output the integer value. Example: 5"
            coursedur_gen = model.generate_content(coursedur_prompt).text
            course_duration = int(coursedur_gen)
            66
            summary_prompt = f"Generate a quick and small summary of this course: {user_message}. Provide the following details: \
                 1. A general summary of the course. Mention what the course will cover generally. (should be quite short in about 4-5 organized sentences. Should be short and no more than this.)\
                 2. Then say the course duration based on {coursedur_gen}. Make sure that the 'Course Duration' is bolded. Example: Course Duration: {coursedur_gen}"
            summary_text = model.generate_content(summary_prompt).text

            # Generate course content for each day
            course_data = {
                'courseName': summary_text,
                'days': {}
            }

            for day in range(1, course_duration + 1):
                lectures_prompt = f"Generate a detailed lecture for Day {day} of a {course_duration}-day course on {user_message}."
                assignments_prompt = f"Generate an assignment for Day {day} of the course on {user_message}. The assignment should be short and something that can be answered with a text input box. "
                quizzes_prompt = f"Create quizzes for Day {day} for the course topic: {user_message}. Include a brief title and a summary of questions covered in each quiz."

                # AI Model call to generate content
                lecture_content = model.generate_content(lectures_prompt).text
                assignment_content = model.generate_content(assignments_prompt).text
                quiz_content = model.generate_content(quizzes_prompt).text

                # Store day's content
                course_data['days'][f'day{day}'] = {
                    'lectures': lecture_content,
                    'assignments': assignment_content,
                    'quizzes': quiz_content
                }

            # Fetch YouTube video recommendations based on the course topic
            youtube_params = {
                'part': 'snippet',
                'q': user_message,
                'type': 'video',
                'order': 'viewCount',  # Sort by most viewed
                'maxResults': 3,
                'key': YOUTUBE_API_KEY,
            }
            youtube_response = requests.get(YOUTUBE_API_URL, params=youtube_params)
            youtube_data = youtube_response.json()
            videos = [
                {
                    'videoId': item['id']['videoId'],
                    'title': item['snippet']['title'],
                    'thumbnail': item['snippet']['thumbnails']['high']['url']
                }
                for item in youtube_data.get('items', [])
            ]

            # Save message to the database
            ChatMessage.objects.create(
                user_message=user_message,
                summary_text=course_data['courseName'],
                lectures_text=json.dumps({day: course_data['days'][day]['lectures'] for day in course_data['days']}),
                assignments_text=json.dumps({day: course_data['days'][day]['assignments'] for day in course_data['days']}),
                quizzes_text=json.dumps({day: course_data['days'][day]['quizzes'] for day in course_data['days']})
            )

            # Return JSON response with the bot's response and video recommendations
            return JsonResponse({'message': 'Course generated successfully', 'course_data': course_data, 'videos': videos})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print(f"An error occurred: {e}")  # Log the error for debugging
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

