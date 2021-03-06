from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.http import HttpResponse
from django.core import serializers
from app.settings import PROJECT_ROOT
import json
import os

@csrf_exempt
def loginFacebook(request):
    infoArray = request.body.decode('UTF-8') # request becomes string
    infoArray = infoArray.split("&")

    if "%C3%85" in infoArray[2]:
        infoArray[2] = infoArray[2].replace("%C3%85", "Å")
    if "%C3%86" in infoArray[2]:
        infoArray[2] = infoArray[2].replace("%C3%86", "Æ")
    if "%C3%98" in infoArray[2]:
        infoArray[2] = infoArray[2].replace("%C3%98", "Ø")

    if "%C3%A5" in infoArray[2]:
        infoArray[2] = infoArray[2].replace("%C3%A5", "å")
    if "%C3%A6" in infoArray[2]:
        infoArray[2] = infoArray[2].replace("%C3%A6", "æ")
    if "%C3%B8" in infoArray[2]:
        infoArray[2] = infoArray[2].replace("%C3%B8", "ø")

    if "%C3%85" in infoArray[3]:
        infoArray[3] = infoArray[3].replace("%C3%85", "Å")
    if "%C3%86" in infoArray[3]:
        infoArray[3] = infoArray[3].replace("%C3%86", "Æ")
    if "%C3%98" in infoArray[3]:
        infoArray[3] = infoArray[3].replace("%C3%98", "Ø")

    if "%C3%A5" in infoArray[3]:
        infoArray[3] = infoArray[3].replace("%C3%A5", "å")
    if "%C3%A6" in infoArray[3]:
        infoArray[3] = infoArray[3].replace("%C3%A6", "æ")
    if "%C3%B8" in infoArray[3]:
        infoArray[3] = infoArray[3].replace("%C3%B8", "ø")

    if "+" in infoArray[2]:
        infoArray[2] = infoArray[2].replace("+", " ")
    if "+" in infoArray[3]:
        infoArray[3] = infoArray[3].replace("+", " ")

    if len(infoArray) > 4:
        email = infoArray[4].split("=")[1]
        email = email.replace("%40", "@")
    else:
        email = ""

    facebookId = infoArray[0].split("=")[1]
    age = infoArray[1].split("=")[1]
    first_name = infoArray[2].split("=")[1]
    last_name = infoArray[3].split("=")[1]

    password = facebookId[:5] + first_name
    user = authenticate(username=facebookId, password=password)

    if user is None:
        user = User(username=facebookId, email=email, first_name=first_name, last_name=last_name, is_staff=False)
        user.set_password(facebookId[:5] + first_name)
        user.save()

        if int(age) >= 21:
            type = "P"
        else:
            type = "C"

        userProfile = UserProfile(user=user, type=type, phone=None, profile_name=first_name, last_name=last_name,
                                  email=email, provider={}, is_active=True)
        userProfile.save()
        login(request, user)

        request.session['username'] = user.username
        request.session['profile_name'] = userProfile.profile_name
        request.session['profile_pk'] = userProfile.pk
        return redirect("skalvi:index")

    elif user is not None:
        profiles = UserProfile.objects.filter(user=user)
        login(request,user)

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
            # if only one profile
            for profile in profiles:
                profile.is_active = True
                profile.save()
                request.session['username'] = user.username
                request.session['profile_name'] = profile.profile_name
                request.session['profile_pk'] = profile.pk
            return redirect("/")

# Admin function to populate the SQLdatabase with all providers from Aktørdatabasen.
def populate(request):
    with open(os.path.join(PROJECT_ROOT, '../app/aktordatabasen.json')) as json_file:
        json_data = json.load(json_file)
    # run through each object that is saved
    for i in json_data:
        try:
            i['Navn'] # throws exception if there is no attribute 'Navn'
            try:
                entry = UserProfile.objects.filter(profile_name=i['Navn'])
            except Exception as e:
                entry = False
            if entry:
                org = Organisation(user=entry.user, userprofile=entry, aktordatabase=i)
            else:
                org = Organisation(aktordatabase=i)
        except:
            org = Organisation(aktordatabase=i)

        org.save()

    return HttpResponse('Done! not sure if faulty tho, please check.')

def getProviders(request):
    json_serializer = serializers.get_serializer("json")()
    providers = Organisation.objects.all()
    providers = json_serializer.serialize(providers, ensure_ascii=False)
    return HttpResponse(providers, content_type='application/json')

def getUserProviders(request):
    profile = UserProfile.objects.get(user=request.user, profile_name=request.session["profile_name"])
    providers = profile.provider.split(",")
    profileProviders = Organisation.objects.filter(pk__in=providers)
    json_serializer = serializers.get_serializer("json")()
    json = json_serializer.serialize(profileProviders, ensure_ascii=False)
    return HttpResponse(json, content_type='application/json')

def getUser(request):
    profile = UserProfile.objects.get(user=request.user, profile_name=request.session["profile_name"])
    providers = profile.provider.split(",")
    username = profile.profile_name
    data = {'name': username, 'providers': providers}
    return HttpResponse(json.dumps(data), content_type='application/json')

def getProvider(request, pk):
    provider = Organisation.objects.get(pk=pk)
    data = {
        'aktordatabase': provider.aktordatabase
    }
    return HttpResponse(json.dumps(data), content_type='application/json')
