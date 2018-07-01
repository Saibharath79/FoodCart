from django.forms import Form,CharField,TextInput,PasswordInput

class Login(Form):
    username = CharField(max_length=75, required=True,
                         widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Username'}))
    password = CharField(max_length=75, required=True,
                         widget=PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Enter Password'}))


class Signup(Form):
    first_name = CharField(max_length=75, required=True,
                           widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter First Name'}))
    last_name = CharField(max_length=75, required=True,
                          widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Last Name'}))
    username = CharField(max_length=75, required=True,
                         widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Username'}))
    password = CharField(max_length=75, required=True,
                         widget=PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Enter Password'}))
    pincode = CharField(max_length=7, required=True,
                         widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Pincode'}))

    phone_number = CharField(max_length=10, required=True,
                         widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Phone Number'}))

    address = CharField(max_length=256, required=True,
                         widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Address'}))
