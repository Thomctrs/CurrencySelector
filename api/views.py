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

from .models import Devise
from .serializers import DeviseSerializer

# class DeviseCreateView(generics.CreateAPIView):
#     queryset = Devise.objects.all()
#     serializer_class = DeviseSerializer
#     #permission_classes = [permissions.IsAuthenticated]
#     http_method_names = ['post']
#     def perform_create(self, serializer):
#         file = self.request.FILES.get("file")
#         if file:
#             if file.content_type == 'text/csv':
#                 df = pd.read_csv(file, delimiter=',')
#             elif file.content_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
#                 df = pd.read_excel(file)
#             else:
#                 return JsonResponse({"error": "Unsupported file type"}, status=400)
#
#             for column in df.columns:
#                 if column != "DateTime":
#                     for index, value in df[column].items():
#                         serializer.save(
#                             pair=column,
#                             ratio=value,
#                             date=df.loc[index, "DateTime"]
#                         )
#         else:
#             return JsonResponse({"error": "No file provided"}, status=400)

class DeviseListView(generics.ListAPIView):
    queryset = Devise.objects.all()
    serializer_class = DeviseSerializer
    http_method_names = ['get']

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