from django.forms import ModelForm
from foodcartapp.models import *

class AddHotel(ModelForm):
    class Meta:
        model=Hotel
        exclude=['hoteladmin']

class UpdateHotel(ModelForm):
    class Meta:
        model=Hotel
        exclude=['hoteladmin']

