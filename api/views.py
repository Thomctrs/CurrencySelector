from django.shortcuts import render

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


