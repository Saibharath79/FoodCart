from django.forms import ModelForm
from foodcartapp.models import *



class AddCity(ModelForm):
    class Meta:
        model=City
        exclude=[]


class UpdateCity(ModelForm):
    class Meta:
        model=City
        exclude=[]

