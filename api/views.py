import pandas as pd

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage

from rest_framework import generics, permissions
from .models import Devise
from .serializers import DeviseSerializer

class DeviseCreateView(generics.CreateAPIView):
    queryset = Devise.objects.all()
    serializer_class = DeviseSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['post']

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
        df = pd.read_excel(file_path)

       # date_str, exchange_rate_str = line.split(",")

       # return JsonResponse({"data": data})

    return JsonResponse({"error": "Invalid request"}, status=400)
