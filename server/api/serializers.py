from rest_framework import serializers
from api.models import Devise

class DeviseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devise
        fields = '__all__'