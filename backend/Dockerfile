# Use official Python image
FROM python:3.11  

# Set the working directory
# WORKDIR /backend
WORKDIR /
# Copy and install dependencies
COPY ./backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt 


ARG GEMINI_API_KEY
ARG PORT
ARG SECRET_KEY
# ARG DATABASE_URL
# ARG PGDATABASE
# ARG PGHOST
# ARG PGPASSWORD
# ARG PGPORT
# ARG PGUSER

ENV PORT ${PORT}
ENV PYTHONUNBUFFERED=1


# Copy the Django project
COPY ./backend .

# Set environment variables (can be overridden in Railway)
# ENV FIREBASE_CONFIG="your-firebase-config"  

EXPOSE 8000

CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["gunicorn", "courseforge_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
