from django.contrib.auth.models import User
from django import forms

from .models import UserProfile, Activity

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
        fields = ['phone', 'profile_name', 'type']

class DateInput(forms.DateInput):
    input_type = 'date'

class ActivityForm(forms.ModelForm):

    activityName = forms.CharField(max_length=80, label="Navn på aktivitet")
    provider = forms.CharField(max_length=80, label="Arrangør")
    adaptions = forms.CharField(widget=forms.Textarea, max_length=80,label="Tilrettelegging")
    age = forms.CharField(max_length=80, label="Alder")
    location = forms.CharField(max_length=80, label="Sted")
    description = forms.CharField(widget=forms.Textarea, label="Om arrangement")
    registration_required = forms.BooleanField(label='Arrangement krever registrering', required=False)
    price = forms.IntegerField(label="Pris")
    date = forms.DateField(label="Dato start", widget=DateInput, input_formats=('%d-%m-%Y','%Y-%m-%d'))
    date_end = forms.DateField(label="Dato slutt", widget=DateInput)
    time_start = forms.TimeField(label="Tid start")
    time_end = forms.TimeField(label="Tid slutt")
    images = forms.ImageField(required=False, label="Bilder")
    videos = forms.ImageField(required=False, label="Videoer")

    class Meta:
        model = Activity
        fields = ['activityName', 'provider', 'adaptions', 'age', 'location', 'description', 'registration_required', 'price', 'date', 'time_start', 'time_end', 'images', 'instagram', 'videos']

class RegisterProfileForm(forms.ModelForm):
    type = forms.BooleanField(label="Voksen", required=False)
    profile_name = forms.CharField(label="Profilnavn", required=True)
    phone = forms.CharField(label="Telefon", required=False)
    class Meta:
        model = UserProfile
        fields = ["profile_name", 'phone', 'type']
