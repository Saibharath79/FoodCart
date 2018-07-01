from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from foodcartapp.models import Product, Order
from foodcartapp.serializers.order_serializer import OrderSerializer
from foodcartapp.serializers.orderdetails_serializer import OrderDetailsSerializer
from foodcartapp.serializers.product_serializer import ProductSerializer
import datetime


@api_view(['POST'])
def order_list_api(request):
    """
    List all code snippets, or create a new snippet.
    """
    # if request.method == 'GET':
    #     products = Product.objects.all()
    #     serializer = ProductSerializer(products, many=True)
    #     return Response(serializer.data)

    if request.method == 'POST':
        order_data={}
        order_data['customer_id']=request.user.id
        order_data['status']=1
        order_data['order_time']=datetime.datetime.now()
        order_data['amount']=request.data['amount']
        order_data['order_type']=1  ### default order_type set to Cash On Delivery Payment interface to be integrated

        products=request.data.pop('products')
        order_serializer = OrderSerializer(data=order_data)

        if order_serializer.is_valid():
            order=order_serializer.save()
            for product in products:
                orderdetails_data={}
                orderdetails_data['product_id']=product['id']
                orderdetails_data['quantity']=product['quantity']
                orderdetails_data['order_id']=order.id
                orderdetail_serializer=OrderDetailsSerializer(data=orderdetails_data)
                if orderdetail_serializer.is_valid():
                    orderdetail_serializer.save()

            return Response(order_serializer.data, status=status.HTTP_201_CREATED)
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes(())
@permission_classes(())
def order_detail_api(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        order = Order.objects.get(pk=pk)
    except order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(order)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.query_params)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
