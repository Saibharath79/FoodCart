from rest_framework.serializers import ModelSerializer

from foodcartapp.models import Location

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'