FROM  python:3.8.13-bullseye

ARG openai_key
ARG assemblyai_key
ARG PORT
ARG SECRET_KEY
ARG DATABASE_URL
ARG PGDATABASE
ARG PGHOST
ARG PGPASSWORD
ARG PGPORT
ARG PGUSER

ENV PORT ${PORT}
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY . . 
RUN pip install -r requirements.txt

# copy from the current directory of the Dockerfile to /api in the image

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]