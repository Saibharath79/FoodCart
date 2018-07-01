from django.contrib.auth.models import User
from rest_framework import serializers

# CustomUser in and as Customer

class CustomerSerializer(serializers.Serializer):
    username=serializers.CharField(max_length=50)
    password=serializers.CharField(max_length=50)
    first_name=serializers.CharField(max_length=50)
    last_name=serializers.CharField(max_length=50)
    phone_number=serializers.CharField(max_length=10)
    pincode=serializers.CharField(max_length=7)
    address=serializers.CharField(max_length=256)

    def create(self, validated_data):
        user=User.objects.create_user(username=validated_data['username'],
                                      password=validated_data['password'],
                                      first_name=validated_data['first_name']
                                      ,last_name=validated_data['last_name'])
        user.customuser.phone_number=validated_data['phone_number']
        user.customuser.pincode=validated_data['pincode']
        user.customuser.address=validated_data['address']
        user.save()
        return user

