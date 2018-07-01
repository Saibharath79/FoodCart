from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView,UpdateView,DeleteView

from foodcartapp.forms.CityForms import UpdateCity, AddCity
from foodcartapp.forms.LocationForms import AddLocation, UpdateLocation
from foodcartapp.models import *
from datetime import datetime


class PermissionHelper(PermissionRequiredMixin):
    def has_permission(self):
        if self.request.user.is_superuser:
            return True
        else:
            raise PermissionDenied


class city_list_view(PermissionHelper,ListView):
    login_url = "/login/"
    permission_denied_message = "User is not Authorized"
    model =City
    template_name = "city_list.html"
    context_object_name = "city_list"



class AddCityView(LoginRequiredMixin,PermissionHelper,CreateView):
    login_url = reverse_lazy("foodcartapp:login")
    template_name = 'add_city.html'
    form_class = AddCity
   # permission_required = "foodcartapp.add_location"
    permission_denied_message = "User does not have permission to add City"
    raise_exception = True
    model = City
    success_url = reverse_lazy("foodcartapp:CitiesView")


class UpdateCityView(LoginRequiredMixin,PermissionHelper,UpdateView):
    login_url = reverse_lazy("foodcartapp:login")
    model = City
    #permission_required = "foodcartapp.change_city"
    permission_denied_message = "User does not have permission to change City"
    raise_exception = True
    form_class = UpdateCity
    template_name = "update_city.html"
    success_url = reverse_lazy("foodcartapp:CitiesView")


class DeleteCityView(LoginRequiredMixin,PermissionHelper,DeleteView):
    login_url = reverse_lazy("foodcartapp:login")
    model = City
    template_name = "city_confirm_delete.html"
    permission_required = "foodcartapp.delete_city"
    permission_denied_message = "User does not have permission to delete city"
    raise_exception = True
    success_url = reverse_lazy("foodcartapp:CitiesView")

