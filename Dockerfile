FROM python:3.12-slim

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Installer les dépendances nécessaires
WORKDIR /app
RUN pip install --upgrade pip
COPY requirements.txt /app/
RUN pip install --no-cache-dir --root-user-action=ignore -r requirements.txt

COPY . /app

EXPOSE 8000

CMD ["sh", "-c", "until nc -z db 5432; do echo 'Waiting for database...'; sleep 1; done; python3 manage.py makemigrations; python3 manage.py migrate; python3 manage.py runserver 0.0.0.0:8000"]
