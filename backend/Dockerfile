# Use official Python image
FROM python:3.11

# Set the working directory
WORKDIR /

# Copy and install dependencies
COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt

# Add gunicorn if it's not already in requirements.txt
RUN pip install gunicorn

# Set up environment variables
ARG GEMINI_API_KEY
ARG PORT
ARG SECRET_KEY

ENV PORT ${PORT}
ENV PYTHONUNBUFFERED=1

# Copy the Django project
COPY . .

# Expose the port
EXPOSE 8000

# Run the Django app with gunicorn
CMD ["gunicorn", "backend.courseforge_backend.wsgi:application", "--bind", "0.0.0.0:8000"]