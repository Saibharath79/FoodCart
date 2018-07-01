from django.forms import ModelForm
from foodcartapp.models import *



class AddProduct(ModelForm):
    class Meta:
        model=Product
        exclude=[]


class UpdateProduct(ModelForm):
    class Meta:
        model=Product
        exclude=[]



