from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from foodcartapp.models import Product
from foodcartapp.serializers.hotel_serializer import HotelSerializer


class ProductSerializer(serializers.Serializer):
    id=serializers.IntegerField()
    name = serializers.CharField(max_length=50)
    half_price = serializers.DecimalField(max_digits=8, decimal_places=2)
    full_price = serializers.DecimalField(max_digits=8, decimal_places=2)
    availabilty = serializers.BooleanField(default=True)
    image = serializers.URLField()
    special_status = serializers.BooleanField(default=False)
    category = serializers.CharField(max_length=50)
    hotel = HotelSerializer(many=False)