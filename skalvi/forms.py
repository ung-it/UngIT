from django.contrib.auth.models import User
from django import forms
from .models import UserProfile, Activity

# Login View
# Make a blueprint for user forms
class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', "password", "first_name", "last_name",
                  "email"]  # Fields that will appear in form in given order
        labels = {
            'username': 'Brukernavn',
            'password': 'Passord',
            'first_name': 'Fornavn',
            'last_name': 'Etternavn',
            'email': 'Epost'
        }
        widgets = {
            'username': forms.TextInput(attrs={'class': 'mdl-textfield__input'}),
            'password': forms.PasswordInput(attrs={'class': 'mdl-textfield__input'}),
            'first_name': forms.TextInput(attrs={'class': 'mdl-textfield__input'}),
            'last_name': forms.TextInput(attrs={'class': 'mdl-textfield__input'}),
            'email': forms.TextInput(attrs={'class': 'mdl-textfield__input'}),
        }

class UserProfileForm(forms.ModelForm):
    type = forms.BooleanField(required=False, widget=forms.CheckboxInput(attrs={'class': 'mdl-checkbox__input'}),
                              label="Forelder")

    class Meta:
        model = UserProfile
        fields = ['phone', 'type']
        labels = {
            'phone': 'Telefon',
        }
        widgets = {
            'phone': forms.TextInput(attrs={'class': 'mdl-textfield__input'}),
        }


class DateInput(forms.DateInput):
    input_type = 'date'

class ActivityForm(forms.ModelForm):
    activityName = forms.CharField(max_length=80, label="Navn på aktivitet")
    provider = forms.CharField(max_length=80, label="Arrangør")
    adaptions = forms.CharField(required=False, max_length=255, label="Tilrettelegging")
    age = forms.CharField(max_length=80, label="Alder")
    location = forms.CharField(max_length=80, label="Sted")
    description = forms.CharField(widget=forms.Textarea, label="Om arrangement")
    registration_required = forms.BooleanField(label='Arrangement krever registrering', required=False)
    price = forms.IntegerField(label="Pris")
    date = forms.DateField(label="Dato start", widget=DateInput, input_formats=('%d-%m-%Y', '%Y-%m-%d'))
    date_end = forms.DateField(label="Dato slutt", widget=DateInput, input_formats=('%d-%m-%Y', '%Y-%m-%d'))
    time_start = forms.TimeField(label="Tid start")
    time_end = forms.TimeField(label="Tid slutt")
    images = forms.ImageField(required=False, label="Bilder")
    videos = forms.ImageField(required=False, label="Videoer")

    class Meta:
        model = Activity
        fields = ['activityName', 'activityType', 'provider', 'facebookID', 'facebookInfo', 'assistants_number',
                  'assistants_text', 'adaptions', 'age', 'location', 'description', 'registration_required', 'price',
                  'date', 'date_end', 'time_start', 'time_end', 'images', 'instagram', 'videos']

class RegisterProfileForm(forms.ModelForm):
    type = forms.BooleanField(label="Voksen", required=False)
    profile_name = forms.CharField(label="Fornavn", required=True)
    last_name = forms.CharField(label="Etternavn", required=True)
    email = forms.CharField(label="Epost", required=True)
    phone = forms.CharField(label="Telefon", required=False)

    class Meta:
        model = UserProfile
        fields = ["profile_name", "last_name", "email", 'phone', 'type']

class ProviderForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ["provider"]
