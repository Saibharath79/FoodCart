from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView,UpdateView,DeleteView
from foodcartapp.forms.HotelForms import UpdateHotel, AddHotel
from foodcartapp.models import *



class PermissionHelper(PermissionRequiredMixin):
    def has_permission(self):
        user = Hotel.objects.values('hoteladmin__id').get(id=self.kwargs['pk'])
        user_id = user['hoteladmin__id']
        if self.request.user.id == user_id:
            return True
        else:
            return False


class hotel_list_view(LoginRequiredMixin,ListView):
    login_url = reverse_lazy("foodcartapp:login")
    model =Hotel
    template_name = "hotel_list.html"
    permission_denied_message = "User does not have permission to view Hotel"
    context_object_name = "hotel_list"

    def get_context_data(self, **kwargs):
        context = super(hotel_list_view, self).get_context_data(**kwargs)
        context['hotel_list'] = Hotel.objects.filter(hoteladmin__id=self.request.user.id)
        context['Name'] = User.objects.get(id=self.request.user.id).username
        # if(len(context['card_list'])!=0):
        #     context['hotel']=Product.objects.values('hotel__name').filter(user__id=self.request.user.id)
        return context



class AddHotelView(LoginRequiredMixin,CreateView):
    login_url = reverse_lazy("foodcartapp:login")
    template_name = 'add_hotel.html'
    form_class = AddHotel
   # permission_required = "foodcartapp.add_hotel"
    permission_denied_message = "User does not have permission to add Hotel"
    raise_exception = True
    model = Hotel
    success_url = reverse_lazy("foodcartapp:HotelView")

    def get_context_data(self, **kwargs):
        context = super(AddHotelView, self).get_context_data(**kwargs)
        context['location'] = Location.objects.all()
        return context

    def post(self, request, *args, **kwargs):
        form = AddHotel(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.hoteladmin = CustomUser.objects.get(id=request.user.id)
            post.save()
        return redirect("foodcartapp:HotelView")


class UpdateHotelView(LoginRequiredMixin,PermissionHelper,UpdateView):
    login_url = reverse_lazy("foodcartapp:login")
    model = Hotel
    permission_required = "foodcartapp.change_hotel"
    permission_denied_message = "User does not have permission to change Hotel"
    raise_exception = True
    form_class = UpdateHotel
    template_name = "update_hotel.html"
    success_url = reverse_lazy("foodcartapp:HotelView")

    def get_context_data(self, **kwargs):
        context = super(UpdateHotelView, self).get_context_data(**kwargs)
        context['hotel'] = Hotel.objects.get(id=self.kwargs['pk'])
        context['location']=Location.objects.all()
        return context


class DeleteHotelView(LoginRequiredMixin,PermissionHelper,DeleteView):
    login_url = reverse_lazy("foodcartapp:login")
    model = Hotel
    template_name = "hotel_confirm_delete.html"
    permission_required = "foodcartapp.delete_hotel"
    permission_denied_message = "User does not have permission to delete hotel"
    raise_exception = True
    success_url = reverse_lazy("foodcartapp:HotelView")

