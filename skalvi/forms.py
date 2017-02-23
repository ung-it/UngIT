from django.contrib.auth.models import User
from django import forms

from .models import UserProfile

# Login View
# Make a blueprint for user forms
class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', "password", "first_name", "last_name", "email"]  # Fields that will appear in form in given order


class UserProfileForm(forms.ModelForm):
    type = forms.BooleanField(label="Parent", required=False)


    class Meta:
        model = UserProfile
        fields = ['phone', 'type']
