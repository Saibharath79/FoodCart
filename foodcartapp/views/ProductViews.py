from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView,UpdateView,DeleteView

from foodcartapp.forms.ProductsForms import AddProduct, UpdateProduct
from foodcartapp.models import *
import cloudinary
import cloudinary.uploader
import cloudinary.api



class PermissionHelper(PermissionRequiredMixin):
    def has_permission(self):
        user = Product.objects.values('hotel__user__id').get(id=self.kwargs['pk'])
        user_id = user['hotel__user__id']
        if self.request.user.id == user_id:
            return True
        else:
            return False


class product_list_view(ListView):
    model =Product
    template_name = "products_list.html"
    context_object_name = "products_list"

    def get_context_data(self,**kwargs):
        context=super(product_list_view,self).get_context_data(**kwargs)
        #print(context)
        context['products_list']=Product.objects.filter(hotel__hoteladmin__user__id=self.request.user.id)
        context['Name']=User.objects.get(id=self.request.user.id).username
        # if(len(context['card_list'])!=0):
        #     context['hotel']=Product.objects.values('hotel__name').filter(user__id=self.request.user.id)
        return context



class AddProductView(LoginRequiredMixin,PermissionRequiredMixin,CreateView):
    login_url = reverse_lazy("foodcartapp:login")
    template_name = 'add_product.html'
    form_class = AddProduct
    permission_required = "foodcartapp.add_product"
    permission_denied_message = "User does not have permission to add Product"
    raise_exception = True
    model = Product
    success_url = reverse_lazy("foodcartapp:ProductsView")


    def get_context_data(self,**kwargs):
        context=super(AddProductView,self).get_context_data(**kwargs)
        context['hotel']=Hotel.objects.filter(hoteladmin_id=self.request.user.id)
        return context

    def post(self, request, *args, **kwargs):
        form = AddProduct(request.POST,request.FILES)
        if form.is_valid():
            product = form.save(commit=False)
            product.image = cloudinary.uploader.upload_image(request.FILES['image']).url
            product.save()
        return redirect("foodcartapp:ProductsView")



class UpdateProductView(LoginRequiredMixin,PermissionHelper,UpdateView):
    login_url = reverse_lazy("foodcartapp:login")
    model = Product
    #permission_required = "foodcartapp.change_product"
    permission_denied_message = "User does not have permission to change Product"
    raise_exception = True
    form_class = UpdateProduct
    template_name = "update_product.html"
    success_url = reverse_lazy("foodcartapp:ProductsView")

    def get_context_data(self, **kwargs):
        context = super(UpdateProductView, self).get_context_data(**kwargs)
        context['product']=Product.objects.get(id=self.kwargs['pk'])
        context['hotel'] = Hotel.objects.filter(hoteladmin_id=self.request.user.id)
        return context


class DeleteProductView(LoginRequiredMixin,PermissionHelper,DeleteView):
    login_url = reverse_lazy("foodcartapp:login")
    model = Product
    template_name = "product_confirm_delete.html"
    permission_required = "foodcartapp.delete_product"
    permission_denied_message = "User does not have permission to delete product"
    raise_exception = True
    success_url = reverse_lazy("foodcartapp:ProductsView")

