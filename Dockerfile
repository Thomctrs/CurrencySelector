FROM python:3.9-slim

# Installer les dépendances nécessaires
WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

EXPOSE 8000

CMD ["py", "manage.py", "runserver"]
