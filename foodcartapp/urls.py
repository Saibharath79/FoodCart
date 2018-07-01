from django.urls import path

from foodcartapp.RESTviews.CityRestView import city_list_api, city_detail_api
from foodcartapp.RESTviews.LocationsRestView import location_list_api
from foodcartapp.RESTviews.OrderRestView import order_list_api, order_detail_api
from foodcartapp.RESTviews.ProductRestView import product_list_api, product_detail_api
from foodcartapp.RESTviews.UserRestView import customer_signup_api
from foodcartapp.views.CityViews import city_list_view, AddCityView, UpdateCityView, DeleteCityView
from foodcartapp.views.HotelViews import hotel_list_view, DeleteHotelView, UpdateHotelView, AddHotelView
from foodcartapp.views.OrderViews import order_list_view
from foodcartapp.views.ProductViews import product_list_view, AddProductView, UpdateProductView, DeleteProductView
from foodcartapp.views.AuthViews import LoginView, LogoutView, SignUpView
from foodcartapp.views.LocationViews import location_list_view,AddLocationView,DeleteLocationView,UpdateLocationView
from foodcartapp.RESTviews import *

app_name="foodcartapp"

urlpatterns=[

    path('products/',product_list_view.as_view(),name="ProductsView"),
    path('addproduct/',AddProductView.as_view(),name="AddProductView"),
    path('<int:pk>/editProduct/',UpdateProductView.as_view(),name="UpdateProductView"),
    path('<int:pk>/deleteProduct/',DeleteProductView.as_view(),name="DeleteProductView"),

    path('locations/',location_list_view.as_view(),name="LocationsView"),
    path('addlocation/',AddLocationView.as_view(),name="AddLocationView"),
    path('<int:pk>/editLoction/',UpdateLocationView.as_view(),name="UpdateLocationView"),
    path('<int:pk>/deleteLoction/',DeleteLocationView.as_view(),name="DeleteLocationView"),

    path('hotels/', hotel_list_view.as_view(), name="HotelView"),
    path('addhotel/', AddHotelView.as_view(), name="AddHotelView"),
    path('<int:pk>/editHotel/', UpdateHotelView.as_view(), name="UpdateHotelView"),
    path('<int:pk>/deleteHotel/', DeleteHotelView.as_view(), name="DeleteHotelView"),


    path('cities/', city_list_view.as_view(), name="CitiesView"),
    path('addcity/', AddCityView.as_view(), name="AddCityView"),
    path('<int:pk>/editCity/', UpdateCityView.as_view(), name="UpdateCityView"),
    path('<int:pk>/deleteCity/', DeleteCityView.as_view(), name="DeleteCityView"),

    path('orders/',order_list_view.as_view(),name="OrderListView"),

    path('login/',LoginView.as_view(),name="Login"),
    path('logout/',LogoutView.as_view(),name="Logout"),
    path('sign_up/',SignUpView.as_view(),name="Signup"),

    path('api/locations/',location_list_api,name="LocationListAPI"),
    path('api/locations/<int:pk>/',location_detail_api,name="LocationDetailAPI"),

    path('api/products/', product_list_api, name="ProductListAPI"),
    path('api/products/<int:pk>/', product_detail_api, name="ProductDetailAPI"),

    path('api/cities/',city_list_api, name="CityListAPI"),
    path('api/cities/<int:pk>/', city_detail_api, name="CityDetailAPI"),


    path('api/order/',order_list_api, name="OrderListAPI"),
    path('api/order/<int:pk>/', order_detail_api, name="OrderDetailAPI"),

    path('api/user_signup/',customer_signup_api,name="UserSignupAPI")

]

