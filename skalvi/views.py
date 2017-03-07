from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login  # Login module handles sessions
from django.views import generic
from django.views.generic import View
from .forms import UserForm, UserProfileForm, ActivityForm, RegisterProfileForm
from django.forms.models import model_to_dict
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt


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
    userprofiles = UserProfile.objects.filter(user=request.user)
    for profile in userprofiles:
        if profile.is_active:
            profile.is_active = False
            profile.save()

    logout(request)
    return redirect("skalvi:index")

@csrf_exempt
def loginView(request):
    template_name = "home.html"
    if(request.POST):
        infoArray = request.body.decode('utf-8')  # request becomes string
        infoArray = infoArray.split("&")

        username = infoArray[0].split("=")[1]
        password = infoArray[1].split("=")[1]

        user = authenticate(username=username, password=password)
        # Check that we got a user back
        if user is not None:
            if user.is_active:
                if user.is_authenticated():
                    profiles = UserProfile.objects.filter(user=user)
                    login(request, user)
                    print("Successfully logged in")
                    if user.is_staff:
                        return redirect("/admin")
                    elif len(profiles) > 1:
                        return redirect("skalvi:choose")
                    else:
                        for profile in profiles:
                            profile.is_active = True
                            profile.save()
                        return redirect("/")
                    # return render(request, "chooseUser.html")
        else:
            return render(request, template_name, {'error_message':"Kontoen eksisterer ikke, ellers er det feil kombinasjon av brukernavn og passord"})

    return redirect("/")


@csrf_exempt
def selectedUser(request):
    name = request.POST.get("profile_name", "")
    pk = request.POST.get("pk", "")
    user_profiles = UserProfile.objects.filter(user=request.user)

    for profile in user_profiles:
        # Checks if one profile already is active and makes is unactive
        if profile.is_active:
            profile.is_active = False
            profile.save()

        # makes the new profile active
        if profile.pk == int(pk):
            profile.is_active = True
            profile.save()
            return render(request, "home.html", {"name": name})

    # return redirect("skalvi:index")


class ChooseUserView(View):
    template_name = "chooseUser.html"
    model = UserProfile

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            user_profile_objects = UserProfile.objects.filter(user=request.user)
            return render(request, self.template_name,
                          {
                              'userprofiles': user_profile_objects,
                          })
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
    form_class = RegisterProfileForm

    def get(self, request, *args, **kwargs):
        form = self.form_class(None)
        if request.user.is_authenticated():
            user_object = request.user
            user_profile_objects = UserProfile.objects.filter(user=request.user)
            return render(request, self.template_name,
                          {
                              'userprofiles': user_profile_objects,
                              'user': user_object,
                              'form': form
                          })
        return HttpResponse("Du må være logget inn for å ha tilgang til denne siden")

    def post(self, request):
        profile_form = self.form_class(request.POST)
        print("FORM ", profile_form)

        if profile_form.is_valid():
            # Take submitted data and save to database
            profile_form.save(commit=False)
            # Cleaned (normalized) data / formated properly
            phone = profile_form.cleaned_data['phone']
            types = profile_form.cleaned_data['type']
            profile_name = profile_form.cleaned_data['profile_name']

            if types:
                types = "P"
            else:
                types = "C"

            profile = UserProfile(user=request.user, phone=phone, type=types, profile_name=profile_name)
            profile.save()

        return redirect("skalvi:mypage")



def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)

def allactivities(request):
    return TemplateResponse(request, 'allActivities.html', {})

