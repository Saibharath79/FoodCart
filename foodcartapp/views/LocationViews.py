from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView,UpdateView,DeleteView

from foodcartapp.forms.LocationForms import AddLocation, UpdateLocation
from foodcartapp.models import *
from datetime import datetime


class PermissionHelper(PermissionRequiredMixin):
    def has_permission(self):
        if self.request.user.is_superuser:
            return True
        else:
            raise PermissionDenied


class location_list_view(PermissionHelper,ListView):
    login_url = "/login/"
    permission_denied_message = "User is not Authorized"
    model =Location
    template_name = "location_list.html"
    context_object_name = "location_list"



class AddLocationView(LoginRequiredMixin,PermissionHelper,CreateView):
    login_url = reverse_lazy("foodcartapp:login")
    template_name = 'add_location.html'
    form_class = AddLocation
    #permission_required = "foodcartapp.add_location"
    permission_denied_message = "User does not have permission to add Location"
    raise_exception = True
    model = Location
    success_url = reverse_lazy("foodcartapp:LocationsView")


class UpdateLocationView(LoginRequiredMixin,PermissionHelper,UpdateView):
    login_url = reverse_lazy("foodcartapp:login")
    model = Location
    #permission_required = "foodcartapp.change_location"
    permission_denied_message = "User does not have permission to change location"
    raise_exception = True
    form_class = UpdateLocation
    template_name = "update_location.html"
    success_url = reverse_lazy("foodcartapp:LocationsView")


class DeleteLocationView(LoginRequiredMixin,PermissionHelper,DeleteView):
    login_url = reverse_lazy("foodcartapp:login")
    model = Location
    template_name = "location_confirm_delete.html"
    permission_required = "foodcartapp.delete_location"
    permission_denied_message = "User does not have permission to delete location"
    raise_exception = True
    success_url = reverse_lazy("foodcartapp:LocationsView")

