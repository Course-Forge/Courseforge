# from django.db import models
# from django.contrib.auth.models import User
# # Create your models here.

# class Course(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     gemini_output = models.TextField(null=True, blank=True)
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="GeminiUser", null=True)
#     #if User deletes account, everything will be deleted ; same applies to any class

#     def __str__(self):
#         return self.title

# # class Project(models.Model):
# #     course = models.ForeignKey(Course, on_delete=models.CASCADE)
# #     title = models.CharField(max_length=200)
# #     description = models.TextField()
# #     code_snippet = models.TextField()
# #     def __str__(self):
# #         return self.title

from django.db import models

class ChatMessage(models.Model):
    user_message = models.TextField()
    summary_text = models.TextField()  # Add this field
    lectures_text = models.TextField()  # Add this field
    assignments_text = models.TextField()  # Add this field
    quizzes_text = models.TextField()  # Add this field
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User: {self.user_message[:50]} - Summary: {self.summary_text[:50]} - Lectures:{self.lectures_text[:100]} - Assignments:{self.lectures_text[:100]} - Quizzes:{self.quizzes_text[:100]}"

    class Meta:
        ordering = ['-timestamp']  # Orders messages by timestamp, newest first
