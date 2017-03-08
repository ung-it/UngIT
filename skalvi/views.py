from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login  # Login module handles sessions
from django.views import generic
from django.views.generic import View
from .forms import UserForm, UserProfileForm, ActivityForm
from django.forms.models import model_to_dict
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404
from django.core import serializers
from django.conf import settings

#Python POST-request
import urllib.request
import json

#Changing directories if in dev/prod
directory = "http://skalvi.no/"
if settings.DEBUG:
    directory = "http://localhost:8000/"

def index(request):
    return TemplateResponse(request, "home.html", {})


def getActivities(request):
    json_serializer = serializers.get_serializer("json")()
    activities = json_serializer.serialize(Activity.objects.all(), ensure_ascii=False)
    return HttpResponse(activities, content_type='application/json')


def getActivity(request, id):
    json_serializer = serializers.get_serializer("json")()
    activities = json_serializer.serialize(Activity.objects.filter(pk=id), ensure_ascii=False)
    return HttpResponse(activities, content_type='application/json')


def logout_user(request):
    logout(request)
    return redirect("skalvi:index")


# Register view
class UserFormView(View):
    form_class = UserForm  # Form View blueprint
    profile_form_class = UserProfileForm
    template_name = "register.html"  # HTML file that form will appear in

    # display blank form
    def get(self, request):
        form = self.form_class(None)  # None represents context
        profile = self.profile_form_class(None)
        return render(request, self.template_name, {
            'form': form,
            'profile': profile
        })

    # process form data
    def post(self, request):
        form = self.form_class(request.POST)
        profile_form = self.profile_form_class(request.POST)
        if form.is_valid():
            # Take submitted data and save to database
            user = form.save(commit=False)  # temporary saved, not saved in database
            profile_form.save(commit=False)

            # Cleaned (normalized) data / formated properly
            email = form.cleaned_data['email']
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            phone = profile_form.cleaned_data['phone']
            types = profile_form.cleaned_data['type']
            profile_name = profile_form.cleaned_data['profile_name']

            if types:
                types = "P"
            else:
                types = "C"

            # Make som changes or something useful
            user.set_password(password)
            user.save()  # saves users to the database

            userProfile = UserProfile(user=user, type=types, phone=phone, profile_name=profile_name)
            userProfile.save()

            # Returns User Object if credentials are correct
            user = authenticate(username=username, password=password)

            # Check that we got a user back
            if user is not None:
                if user.is_active:
                    login(request, user)

                    return redirect('skalvi:index')

        # If not successfully logged in, returns to the same page.
        # Return to the login page
        
        return render(request, self.template_name,
            {
                'form': form,
                'profile': profile_form
            })

class ActivityView(generic.DetailView):
        model = Activity
        template_name = "activity.html"
        form_class = ActivityForm

        def get(self, request, *args, **kwargs):
            form = self.form_class(initial=model_to_dict(self.get_object()))
            return render(request, self.template_name, {'form': form})

        def post(self, request, pk):
            instance = get_object_or_404(Activity, pk=pk)
            form = ActivityForm(request.POST, request.FILES, instance=instance)

            if form.is_valid():
                form.save()
                return redirect('/')
            else:
                return render(request, self.template_name, {'form': form, 'error_message': "Kunne ikke lagre aktiviteten. Et eller flere felt har feil verdier"})

class createActivity(View):
    template_name = "activity.html"
    form_class = ActivityForm

    def get(self, request):
        form = self.form_class(None)
        token = request.GET.get('code')
        if token: #User has logged in with Instagram
            post_data = [
                ('client_id', 'e3b85b32b9eb461190ba27b4c32e2cc6'),
                ('client_secret', 'f9ad52972e1a4a21a7d34fa508d2bba4'),
                ('grant_type', 'authorization_code'),
                ('redirect_uri', directory + 'activity/'),
                ('code', token)
            ]
            data = urllib.parse.urlencode(post_data)
            result = urllib.request.urlopen('https://api.instagram.com/oauth/access_token', data.encode("ascii"))
            temp = result.read().decode('ascii')
            content = json.loads(temp)
            accessToken = content['access_token']
            url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken
            result = urllib.request.urlopen(url)
            content = json.loads(result.read().decode('ascii'))
            images = []
            for image in content['data']:
                images.append(image['images']['standard_resolution']['url'])
            return render(request, self.template_name, {'form': form, 'images': images})
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = ActivityForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('/')
        else:
            return render(request, self.template_name, {'form': form, 'error_message': "Kunne ikke lagre aktiviteten. Et eller flere felt har feil verdier"})

class MyPageView(View):
    template_name = 'mypage.html'
    model = UserProfile

    def get(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        print(pk)

        print("userprofile query: ")
        userprofileObject = UserProfile.objects.get(pk=pk)
        print(userprofileObject)
        print()
        print("userobject query: " + str(userprofileObject.user_id))
        userObject = User.objects.get(pk=userprofileObject.user_id)
        print(userObject)

        return render(request, self.template_name,
                      {
                          'userprofile': userprofileObject,
                          'user': userObject
                      })


def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)

def allactivities(request):
    return TemplateResponse(request, 'allActivities.html', {})

