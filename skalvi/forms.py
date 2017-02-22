from django.contrib.auth.models import User
from django import forms


## Login View
## Make a blueprint for user forms
class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)


    class Meta:
        model = User
        fields = ['username', "password", "first_name", "last_name", "email"]  # Fields that will appear in form in given order

