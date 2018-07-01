from django.views.generic import ListView
from foodcartapp.models import *


class order_list_view(ListView):
    model =OrderDetails
    template_name = "order_list.html"
    context_object_name = "orderdetails_list"

    def get_context_data(self,**kwargs):
        context=super(order_list_view,self).get_context_data(**kwargs)
        #print(context)
        context['orders_list']=OrderDetails.objects.filter(product__hotel__hoteladmin__user__id=self.request.user.id)
        context['Name']=User.objects.get(id=self.request.user.id).username
        # if(len(context['card_list'])!=0):
        #     context['hotel']=Product.objects.values('hotel__name').filter(user__id=self.request.user.id)
        return context


