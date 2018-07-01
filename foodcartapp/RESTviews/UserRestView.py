from django.contrib.auth.models import User, Group
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from foodcartapp.serializers.CustomerSerializer import CustomerSerializer



@api_view(['POST'])
@authentication_classes(())
@permission_classes(())
def customer_signup_api(request):

    if request.method == 'POST':
        customerserializer = CustomerSerializer(data=request.data)

        if customerserializer.is_valid():
            user=customerserializer.save()
            customer=Group.objects.get(name="Customers")
            customer.user_set.add(user)

            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(customerserializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

