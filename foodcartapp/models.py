from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver


class City(models.Model):
    name=models.CharField(max_length=50)
    state=models.CharField(max_length=50)


class Location(models.Model):
    name=models.CharField(max_length=50)
    pincode = models.CharField(max_length=7)
    city=models.ForeignKey(City,on_delete=models.CASCADE)


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=10)
    pincode = models.CharField(max_length=7)
    address = models.CharField(max_length=256)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            CustomUser.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.customuser.save()


# class HotelAdmin(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     phone_number = models.CharField(max_length=10)
#     pincode = models.CharField(max_length=7)
#     address = models.CharField(max_length=256)
#
#     @receiver(post_save, sender=User)
#     def create_user_profile(sender, instance, created, **kwargs):
#         if created:
#             HotelAdmin.objects.create(user=instance)
#
#     @receiver(post_save, sender=User)
#     def save_user_profile(sender, instance, **kwargs):
#         instance.hoteladmin.save()


class Hotel(models.Model):
    name=models.CharField(max_length=50)
    location=models.ForeignKey(Location,on_delete=models.CASCADE)
    gst=models.DecimalField(max_digits=4,decimal_places=2)
    hoteladmin = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class Product(models.Model):
    name=models.CharField(max_length=50)
    half_price=models.DecimalField(max_digits=8,decimal_places=2)
    full_price=models.DecimalField(max_digits=8,decimal_places=2)
    availabilty=models.BooleanField(default=True)
    image=models.ImageField()
    special_status=models.BooleanField(default=False)
    category = models.CharField(max_length=50)
    hotel=models.ForeignKey(Hotel,on_delete=models.CASCADE)

class Order(models.Model):
    customer=models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True)
    status=models.SmallIntegerField(default=1)
    order_time=models.DateTimeField()
    delivery_time=models.DateTimeField(blank=True,null=True)
    amount=models.DecimalField(max_digits=15,decimal_places=2)
    order_type=models.SmallIntegerField(default=1)


class OrderDetails(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.DecimalField(max_digits=8,decimal_places=2)
    order=models.ForeignKey(Order,on_delete=models.CASCADE)




