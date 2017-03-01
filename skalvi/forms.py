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
        fields = ['phone', 'type']

class ActivityForm(forms.ModelForm):

    adaptions = forms.CharField(widget=forms.Textarea)
    description = forms.CharField(widget=forms.Textarea)
    registration_required = forms.BooleanField(label='Registration required')
    price = forms.IntegerField()
    date = forms.DateField()
    time_start = forms.TimeField()
    time_end = forms.TimeField()
    images = forms.CharField(required=False)
    videos = forms.CharField(required=False)

    class Meta:
        model = Activity
        fields = ['activityName', 'provider', 'adaptions', 'age', 'location', 'description', 'registration_required', 'price', 'date', 'time_start', 'time_end', 'images', 'videos']
