from rest_framework import serializers

from foodcartapp.models import OrderDetails

class OrderDetailsSerializer(serializers.Serializer):
    order_id =serializers.IntegerField()
    product_id=serializers.IntegerField()
    quantity=serializers.IntegerField()


    def create(self, validated_data):
        orderdetails=OrderDetails.objects.create(**validated_data)
        return orderdetails
