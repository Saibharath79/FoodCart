import datetime

from django.contrib.auth.models import User
from rest_framework import serializers

from foodcartapp.models import Order


class OrderSerializer(serializers.Serializer):
    customer_id =serializers.IntegerField()
    status = serializers.IntegerField(default=1)
    order_time = serializers.DateTimeField(default=datetime.datetime.now())
    delivery_time = serializers.DateTimeField(default=datetime.datetime.now())
    amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    order_type = serializers.IntegerField(default=1)


    def create(self, validated_data):
        order=Order.objects.create(**validated_data)
        return order
