from rest_framework.serializers import ModelSerializer

from foodcartapp.models import Hotel
from foodcartapp.serializers.location_serializer import LocationSerializer


class HotelSerializer(ModelSerializer):
    location=LocationSerializer(many=False)
    class Meta:
        model=Hotel
        fields='__all__'

    def create(self, validated_data):
        return Hotel.objects.create(**validated_data)