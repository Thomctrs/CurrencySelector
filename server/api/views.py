from datetime import datetime

import pandas as pd
from django.views.generic import CreateView
from django.shortcuts import render
from django.http import JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.http import HttpResponseRedirect
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Devise
from .serializers import DeviseSerializer

class DeviseListView(generics.ListAPIView):
    queryset = Devise.objects.all()
    serializer_class = DeviseSerializer
    http_method_names = ['get']

    def filter_queryset(self, queryset):
        """
        Filtre la liste des devises en fonction des paramètres de la requête.
        """
        # Récupère les paramètres de la requête
        filter_value = self.request.query_params.get('filter', None)
        id_value = self.request.query_params.get('id', None)
        pair_value = self.request.query_params.get('pair', None)

        if id_value:
            if not id_value.isdigit():
                raise ValidationError({'id': 'Le paramètre id doit être un entier valide.'})
            queryset = queryset.filter(id=id_value)

        if filter_value:
            queryset = queryset.filter(name__icontains=filter_value)  # Exemple avec un champ "name"

        if pair_value:
            queryset = queryset.filter(pair=pair_value)

        return queryset

@csrf_exempt
def upload_excel(request):
    if request.method == "POST" and request.FILES.get("file"):
        excel_file = request.FILES["file"]
        file_path = default_storage.save("temp.xlsx", excel_file)

        # Charger le fichier Excel avec pandas
        df = pd.read_csv(file_path)

        # Enregistrer les données dans la base de données
        for column in df.columns:
            if column != "DateTime":
                for index, value in df[column].items():
                    devise = Devise(
                        pair=column,
                        ratio=value,
                        date=df.loc[index, "DateTime"]
                    )
                    devise.save()



    return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def upload_and_save_data(request):
    if request.method == "POST" and request.FILES.get("file"):
        excel_file = request.FILES["file"]
        file_path = default_storage.save("temp.csv", excel_file)

        # Lire le fichier CSV avec pandas
        df = pd.read_csv(file_path)

        # Convertir la colonne "DateTime" en format de date 'YYYY-MM-DD'
        df['DateTime'] = pd.to_datetime(df['DateTime']).dt.date
        # Enregistrer les données dans la base de données
        devises = []
        for column in df.columns:
            if column != "DateTime":
                for index, value in df[column].items():
                    devise = Devise(
                        pair=column,
                        ratio=value,
                        date=df.loc[index, "DateTime"]  # Colonne convertie au format YYYY-MM-DD
                    )
                    devises.append(devise)
        Devise.objects.bulk_create(devises)
        return JsonResponse({"message": "Data imported successfully"}, status=200)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)