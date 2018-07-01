from django.forms import ModelForm
from foodcartapp.models import *



class AddLocation(ModelForm):
    class Meta:
        model=Location
        exclude=[]


class UpdateLocation(ModelForm):
    class Meta:
        model=Location
        exclude=[]

