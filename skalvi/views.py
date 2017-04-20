from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login  # Login module handles sessions
from django.views import generic
from django.views.generic import View
from .forms import UserForm, UserProfileForm, ActivityForm, RegisterProfileForm, ProviderForm
from django.forms.models import model_to_dict
from .models import *
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404
from django.core import serializers
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from datetime import *

# Aktørdatabase
from .scraper import Scraper

# Python POST-request
import urllib.request
import json

# Changing directories if in dev/prod
directory = "http://skalvi.no/"
if settings.DEBUG:
    directory = "http://localhost:8000/"


@csrf_exempt
def index(request):
    return TemplateResponse(request, "home.html", {})


@csrf_exempt
def signUpActivity(request):
    activityId = str(request.body.decode('utf-8')).split(":")[1][:-1]
    activity = Activity.objects.get(pk=activityId)
    # User logged in
    if 'username' and 'profile_pk' in request.session:
        profileId = request.session['profile_pk']
        profile = UserProfile.objects.get(pk=profileId)

        # Check if user already is attending
        try:
            participate = ParticipateIn.objects.get(activityId=activity, userId=request.user, user_profile_id=profile)
            response = {'attending': True}

        # if user is not attending
        except ParticipateIn.DoesNotExist:
            participate = ParticipateIn(activityId=activity, userId=request.user, user_profile_id=profile)
            participate.save()

            response = {'attending': False}
            # return render(request, "home.html", {"message": "Du er nå påmeldt dette arrangementet."})
    # User not logged in
    else:
        # user is not loged in, should not be possible to attend activity
        response = {'attending': None}  # not logged in
    return HttpResponse(json.dumps(response), content_type='application/json')


@csrf_exempt
def checkIfSingedUp(request):
    activityId = str(request.body.decode('utf-8')).split(":")[1][:-1]
    activity = Activity.objects.get(pk=activityId)
    # User logged in
    if 'username' and 'profile_pk' in request.session:
        profileId = request.session['profile_pk']
        profile = UserProfile.objects.get(pk=profileId)
        json_serializer = serializers.get_serializer("json")()
        # response = ""
        # Check if user already is attending
        try:
            participate = ParticipateIn.objects.get(activityId=activity, userId=request.user, user_profile_id=profile)
            response = {'attending': True}

        except ParticipateIn.DoesNotExist:
            # If user isn't signed up
            response = {'attending': False}
    else:
        # If user is not loged in
        response = {'attending': None}
    return HttpResponse(json.dumps(response), content_type='application/json')


@csrf_exempt
def signOfEvent(request):
    activityId = str(request.body.decode('utf-8')).split(":")[1][:-1]
    activity = Activity.objects.get(pk=activityId)
    # User logged in
    if 'username' and 'profile_pk' in request.session:
        profileId = request.session['profile_pk']
        profile = UserProfile.objects.get(pk=profileId)

        try:
            participate = ParticipateIn.objects.get(activityId=activity, userId=request.user, user_profile_id=profile)
            participate.delete()
            response = {'attending': True}

        except ParticipateIn.DoesNotExist:
            # Not attending, can't sign of
            response = {'attending': False}

    else:
        # If user is not loged in
        # Will never happen
        response = {'attending': None}
    return HttpResponse(json.dumps(response), content_type='application/json')

@csrf_exempt
def getFollowingProviders(request):
    if request.user.is_authenticated:
        profile_name = request.session['profile_name']
        profile = UserProfile.objects.get(user=request.user, profile_name=profile_name)

        providers = Follows.objects.filter(userId=request.user, user_profile_id=profile)
        follows_objects = []
        for provider in providers:
            prov = Organisation.objects.get(pk=provider.orgId.pk)
            follows_objects.append(prov)
        json_serializer = serializers.get_serializer("json")()
        followingProviders = json_serializer.serialize(follows_objects, ensure_ascii=False)
        return HttpResponse(followingProviders, content_type='application/json')


@csrf_exempt
def follow(request):
    providerId = str(request.body.decode('utf-8')).split(":")[1][:-1]
    provider = Organisation.objects.get(pk=providerId)
    # User logged in
    if 'username' and 'profile_pk' in request.session:
        profileId = request.session['profile_pk']
        profile = UserProfile.objects.get(pk=profileId)
        # Check if user already is following
        try:
            follows = Follows.objects.get(orgId=provider, userId=request.user, user_profile_id=profile)
            response = {'following': True}
        # if user is not following
        except Follows.DoesNotExist:
            follows = Follows(orgId=provider, userId=request.user, user_profile_id=profile)
            follows.save()

            response = {'following': False}
    # User not logged in
    else:
        # user is not loged in, should not be possible to attend activity
        response = {'following': None}  # not logged in
    return HttpResponse(json.dumps(response), content_type='application/json')

@csrf_exempt
def unFollow(request):
    providerId = str(request.body.decode('utf-8')).split(":")[1][:-1]
    provider = Organisation.objects.get(pk=providerId)
    # User logged in
    if 'username' and 'profile_pk' in request.session:
        profileId = request.session['profile_pk']
        profile = UserProfile.objects.get(pk=profileId)
        # Check if user already is following
        try:
            follows = Follows.objects.get(orgId=provider, userId=request.user, user_profile_id=profile)
            follows.delete()
            response = {'following': True}
        # if user is not following
        except Follows.DoesNotExist:
            #  Not following, can't unfollow
            response = {'following': False}
    # User not logged in
    else:
        # user is not loged in, should not be possible to attend activity
        response = {'following': None}  # not logged in
    return HttpResponse(json.dumps(response), content_type='application/json')

@csrf_exempt
def checkIfFollowing(request):
    providerId = str(request.body.decode('utf-8')).split(":")[1][:-1]
    provider = Organisation.objects.get(pk=providerId)

    # User logged in
    if 'username' and 'profile_pk' in request.session:
        profileId = request.session['profile_pk']
        profile = UserProfile.objects.get(pk=profileId)
        # Check if user already is attending
        try:
            follows = Follows.objects.get(orgId=provider, userId=request.user,
                                                    user_profile_id=profile)
            response = {'following': True}

        except Follows.DoesNotExist:
            # If user does not follow
            response = {'following': False}
    else:
        # If user is not loged in
        response = {'following': None}
    return HttpResponse(json.dumps(response), content_type='application/json')


def checkIfLogedIn(request):
    if 'username' and 'profile_pk' in request.session:
        response = {"active": True}
        print("ACTIVE")
    else:
        response = {"active:": False}
        print("INACTIVE")
    return HttpResponse(json.dumps(response), content_type='application/json')


def getAttendingActivities(request):
    profile_name = request.path.split("/")[3]
    json_serializer = serializers.get_serializer("json")()
    if request.user.is_authenticated:
        if profile_name == "undefined":
            profile_name = request.session['profile_name']
    else:
        message = {"message": "no user signed in"}
        return HttpResponse(json.dumps(message))

    profile = UserProfile.objects.get(user=request.user, profile_name=profile_name)
    activities = ParticipateIn.objects.filter(userId=request.user, user_profile_id=profile)
    activitie_objects = []
    for activity in activities:
        act = Activity.objects.get(pk=activity.activityId.pk)
        activitie_objects.append(act)
    attendingActivities = json_serializer.serialize(activitie_objects, ensure_ascii=False)
    return HttpResponse(attendingActivities, content_type='application/json')


def getHostingActivities(request):
    profile_name = request.path.split("/")[3]
    profile = UserProfile.objects.get(user=request.user, profile_name=profile_name)

    activities = Hosts.objects.filter(adminId=request.user, profileId=profile)
    activitie_objects = []
    for activity in activities:
        act = Activity.objects.get(pk=activity.activityId.pk)
        activitie_objects.append(act)
    json_serializer = serializers.get_serializer("json")()
    hostingActivities = json_serializer.serialize(activitie_objects, ensure_ascii=False)
    return HttpResponse(hostingActivities, content_type='application/json')


def getActivityHost(request):
    profile = UserProfile.objects.get(user=request.user, profile_name=request.session["profile_name"])
    activityid = request.path.split("/")[3]
    activity = Activity.objects.get(pk=activityid)
    try:
        host_activity = Hosts.objects.get(adminId=request.user, profileId=profile, activityId=activity)
        host = {"host": 'true'}
        return HttpResponse(json.dumps(host))  # valid host
    except Hosts.DoesNotExist:
        host = {"host": 'false'}
        return HttpResponse(json.dumps(host))  # invalid host


def getActivities(request):
    json_serializer = serializers.get_serializer("json")()
    activities = Activity.objects.all()
    activities = json_serializer.serialize(activities, ensure_ascii=False)
    return HttpResponse(activities, content_type='application/json')


def getProHostingActivities(request, *args, **kwargs):
    orgId = request.path.split("/")[3] # /api/proHosting/8411/
    json_serializer = serializers.get_serializer("json")()
    try:
        organisation = Organisation.objects.get(pk=orgId)
        activities = Activity.objects.filter(provider=orgId)
        activities = json_serializer.serialize(activities, ensure_ascii=False)
        return HttpResponse(activities, content_type='application/json')
    except Organisation.DoesNotExist:
        return redirect("skalvi:index")



def getActivity(request, id):
    json_serializer = serializers.get_serializer("json")()
    activities = json_serializer.serialize(Activity.objects.filter(pk=id), ensure_ascii=False)
    return HttpResponse(activities, content_type='application/json')


@csrf_exempt
def rateActivity(request):
    activityId = str(request.body.decode('utf-8')).split(":")[1][:1]
    rating = str(request.body.decode('utf-8')).split(":")[2][:1]
    activity = Activity.objects.get(pk=activityId)
    currentRating = activity.rating
    activity.number_of_ratings = activity.number_of_ratings + 1
    activity.rating = (currentRating + float(rating))
    activity.save()
    return HttpResponse(status=200, content_type='application/json')


@csrf_exempt
def postComment(request):
    activityId = str(request.body.decode('utf-8')).split(":")[1][:1]
    comment = str(request.body.decode('utf-8')).split(":")[-1][1:-2]
    if comment.strip() == "":  # Checks if comment is blank
        return HttpResponse()
    activity = Activity.objects.get(pk=activityId)
    user_profile = UserProfile.objects.get(pk=request.session['profile_pk'])
    post = Commentary(userId=request.user, userProfile=user_profile, userProfile_name=user_profile.profile_name,
                      activityId=activity, comment=comment, date=datetime.now().date(), time=datetime.now().time())
    post.save()
    return HttpResponse(status=200, content_type='application/json')


@csrf_exempt
def getComments(request):
    activityId = request.path.split("/")[2]
    activity = Activity.objects.get(pk=activityId)
    json_serializer = serializers.get_serializer("json")()
    comments = json_serializer.serialize(Commentary.objects.filter(activityId=activity), ensure_ascii=False)
    if comments == "[]":
        message = {"message": "ingen kommentar funnet"}
        return HttpResponse(json.dumps(message))  # no comments

    return HttpResponse(comments, content_type='application/json')


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
    if (request.POST):
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
                    if user.is_staff:
                        for profile in profiles:
                            profile.is_active = True
                            profile.save()
                            request.session['username'] = user.username
                            request.session['profile_name'] = profile.profile_name
                            request.session['profile_pk'] = profile.pk
                            break
                        return redirect("/admin")
                    elif len(profiles) > 1:
                        return redirect("skalvi:choose")
                    else:
                        for profile in profiles:
                            profile.is_active = True
                            profile.save()
                            request.session['username'] = user.username
                            request.session['profile_name'] = profile.profile_name
                            request.session['profile_pk'] = profile.pk
                            break
                        return redirect("/")
        else:
            return render(request, template_name, {
                'error_message': "Kontoen eksisterer ikke, ellers er det feil kombinasjon av brukernavn og passord"})

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
            request.session['username'] = request.user.username
            request.session['profile_name'] = profile.profile_name
            request.session['profile_pk'] = profile.pk

    return redirect("skalvi:index")


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

            if types:
                types = "P"
            else:
                types = "C"

            # Make som changes or something useful
            user.set_password(password)
            user.save()  # saves users to the database

            userProfile = UserProfile(user=user, type=types, phone=phone, profile_name=first_name, last_name=last_name,
                                      email=email, provider="")
            userProfile.is_active = True
            userProfile.save()

            # Returns User Object if credentials are correct
            user = authenticate(username=username, password=password)

            # Check that we got a user back
            if user is not None:
                if user.is_active:
                    login(request, user)
                    request.session['username'] = user.username
                    request.session['profile_name'] = userProfile.profile_name
                    request.session['profile_pk'] = userProfile.pk

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
        if request.user.is_authenticated:
            profile = UserProfile.objects.get(user=request.user, profile_name=request.session["profile_name"])
            activity = Activity.objects.get(pk=self.kwargs["pk"])
            try:
                host_activity = Hosts.objects.get(adminId=request.user, profileId=profile, activityId=activity)
                form = self.form_class(initial=model_to_dict(self.get_object()))
                print(self.kwargs['pk'])
                return activityGet(self, request, form)
            except Hosts.DoesNotExist:
                return redirect("skalvi:index")
        else:
            return redirect("skalvi:index")

    def post(self, request, pk):
        if request.user.is_authenticated:
            profile = UserProfile.objects.get(user=request.user, profile_name=request.session["profile_name"])
            activity = Activity.objects.get(pk=self.kwargs["pk"])
            try:
                host_activity = Hosts.objects.get(adminId=request.user, profileId=profile, activityId=activity)
                form = self.form_class(initial=model_to_dict(self.get_object()))
                request.POST = request.POST.copy()
                instance = get_object_or_404(Activity, pk=pk)
                form = ActivityForm(request.POST, request.FILES, instance=instance)
                form.data = form.data.copy()
                if form.is_valid():
                    form.save()
                    return redirect('/')
                else:
                    return render(request, self.template_name, {'form': form, 'error_message': form.errors})

            except Hosts.DoesNotExist:
                return redirect("skalvi:index")
        else:
            return redirect("skalvi:index")


class createActivity(View):
    template_name = "activity.html"
    form_class = ActivityForm

    def get(self, request):
        if request.user.is_authenticated:
            activityID = request.GET.get('activity')
            if activityID != '0' and activityID:
                token = request.GET.get('code')
                if token:
                    return redirect('/activity/' + activityID + "?code=" + token)
                return redirect('/activity/' + activityID)
            form = self.form_class(None)
            return activityGet(self, request, form)
        return HttpResponse(
            "Du må være logget inn for å kunne lage et arrangement")  # Should render/redirect to something usefull

    def post(self, request):
        form = ActivityForm(request.POST, request.FILES)
        if form.is_valid():
            # instagram = request.POST['instagramImages']
            # if instagram:
            #     form.cleaned_data['instagram'] = instagram
            form.save()

            user_profile = UserProfile.objects.get(pk=request.session['profile_pk'])
            activity = Activity.objects.latest('id')
            hosts = Hosts(activityId=activity, adminId=request.user, profileId=user_profile)
            hosts.save()
            return redirect('/')
        else:
            return render(request, self.template_name, {'form': form, 'error_message': form.errors})


def activityGet(self, request, form):
    activityID = '0'
    if 'pk' in self.kwargs:
        activityID = self.kwargs['pk']
    token = request.GET.get('code')
    link = 'https://www.instagram.com/oauth/authorize/?client_id=e3b85b32b9eb461190ba27b4c32e2cc6&redirect_uri=' + directory + 'activity/?activity=' + activityID + '&response_type=code&scope=public_content'
    if 'accessToken' in request.session:
        accessToken = request.session['accessToken']
    elif token:  # User has logged in with Instagram
        post_data = [
            ('client_id', 'e3b85b32b9eb461190ba27b4c32e2cc6'),
            ('client_secret', 'f9ad52972e1a4a21a7d34fa508d2bba4'),
            ('grant_type', 'authorization_code'),
            ('redirect_uri', directory + 'activity/'),
            ('code', token)
        ]
        data = urllib.parse.urlencode(post_data)
        try:
            result = urllib.request.urlopen('https://api.instagram.com/oauth/access_token', data.encode("ascii"))
            temp = result.read().decode('ascii')
            content = json.loads(temp)
            accessToken = content['access_token']
            request.session['accessToken'] = accessToken
        except urllib.error.URLError as e:
            return redirect(link)

    if 'accessToken' in locals():
        url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken
        # url = 'https://api.instagram.com/v1/users/5405987/media/recent?access_token=' + accessToken
        result = urllib.request.urlopen(url)
        content = json.loads(result.read().decode('ascii'))
        images = []
        for image in content['data']:
            images.append(image['images']['standard_resolution']['url'])
        return render(request, self.template_name, {'form': form, 'images': images})
    return render(request, self.template_name, {'form': form, 'link': link})


class MyPageView(View):
    template_name = 'mypage.html'
    model = UserProfile
    form_class = RegisterProfileForm

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():

            if 'username' in request.session:
                username = request.session['username']

            user_object = request.user
            user_profile_objects = UserProfile.objects.filter(user=request.user)
            profiles = []
            for profile in user_profile_objects:
                path = "/mypage/" + str(profile.profile_name) + "/"
                facebook = isNum(username)
                iFollow = Follows.objects.filter(userId=request.user, user_profile_id=profile)
                follow = []
                if not iFollow:
                    follow.append(["../../allproviders/", "Du følger ingen akøter. Se om du finner noen du liker."])

                for f in iFollow:
                    provider = Organisation.objects.get(pk=f.orgId.pk)
                    follow.append(["../../provider/"+str(f.orgId.pk)+"/", provider.aktordatabase["Navn"]])

                prov = []
                if profile.provider != None and not str(profile.provider) == '' and not str(profile.provider) == "{}":
                    splitString = str(profile.provider)
                    if(',' in profile.provider):
                        myProviders = splitString.split(',')
                        for p in myProviders:
                            prov.append(Organisation.objects.get(pk=p).aktordatabase["Navn"])
                    else:
                        prov.append(Organisation.objects.get(pk=splitString).aktordatabase["Navn"])

                object = {'profile_name': profile.profile_name, "last_name": profile.last_name, "email": profile.email,
                          "type": profile.type, "phone": profile.phone, "is_active": profile.is_active,
                          'initiales': profile.profile_name[0:2].upper(), 'path': path, 'facebook': facebook, "follow": follow, "providers": prov}
                profiles.append(object)

            return render(request, self.template_name,
                          {
                              'user': user_object,
                              'profiles': profiles

                          })
        return HttpResponse("Du må være logget inn for å ha tilgang til denne siden")


class RegisterProfileView(View):
    template_name = 'registerProfile.html'
    model = UserProfile
    form_class = RegisterProfileForm

    def get(self, request, *args, **kwargs):
        form = self.form_class(None)
        if request.user.is_authenticated():
            return render(request, self.template_name,
                          {
                              'registerProfileForm': form
                          })
        return HttpResponse("Du må være logget inn for å ha tilgang til denne siden")

    def post(self, request):
        profile_form = self.form_class(request.POST)

        if profile_form.is_valid():
            # Take submitted data and save to database
            profile_form.save(commit=False)
            # Cleaned (normalized) data / formated properly
            phone = profile_form.cleaned_data['phone']
            types = profile_form.cleaned_data['type']
            profile_name = profile_form.cleaned_data['profile_name']
            last_name = profile_form.cleaned_data['last_name']
            email = profile_form.cleaned_data['email']

            if types:
                types = "P"
            else:
                types = "C"

            profile = UserProfile(user=request.user, phone=phone, type=types, profile_name=profile_name,
                                  last_name=last_name, email=email)
            profile.save()

        return redirect("../mypage/" + profile_name)


class ProviderView(View):
    model = UserProfile
    template_name = "provider.html"
    form_class = ProviderForm

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            profile = UserProfile.objects.get(user=request.user, profile_name=request.session["profile_name"])
            return render(request, self.template_name, {'user': profile})
        else:
            return redirect("skalvi:index")

    def post(self, request):
        if request.user.is_authenticated:
            profile = UserProfile.objects.get(user=request.user, profile_name=request.session["profile_name"])
            providers = request.POST.get("provider")
            profile.provider = providers
            profile.save(update_fields=["provider"])

            return redirect("../mypage/" + request.session["profile_name"])
        else:
            return redirect("skalvi:index")

class SingleProviderView(View):
    model = Organisation
    template_name = "singleProvider.html"

    def get(self, request, *args, **kwargs):
        orgId = request.path.split("/")[2] ## /provider/1/

        try:
            organisation = Organisation.objects.get(pk=orgId)
            context = {"provider": organisation.aktordatabase}

            return render(request, self.template_name, context)

        except Organisation.DoesNotExist:
            return redirect("skalvi:index")




def allactivities(request):
    return TemplateResponse(request, 'allActivities.html', {})


def allproviders(request):
    return TemplateResponse(request, 'allProviders.html', {})


def isNum(data):
    try:
        int(data)
        return True
    except ValueError:
        return False


def robots(request):
    return TemplateResponse(request, 'robots.txt', content_type='text/plain')
