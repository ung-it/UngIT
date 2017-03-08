from django.contrib.auth import authenticate, login  # Login module handles sessions
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import *
from django.contrib import messages
import json
from django.http import HttpResponse, HttpResponseRedirect
from django.template.response import TemplateResponse

from django.core.exceptions import ObjectDoesNotExist

from django.db.models.base import ObjectDoesNotExist

@csrf_exempt
def loginFacebook(request):
    infoArray = request.body.decode('utf-8')  # request becomes string
    infoArray = infoArray.split("&")

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

        userProfile = UserProfile(user=user, type=type, phone=None, profile_name=first_name)
        userProfile.save()
        login(request, user)
        return redirect("skalvi:skalvi")
    elif user is not None:
        profiles = UserProfile.objects.filter(user=user)
        login(request,user)
        if user.is_staff:
            return redirect("/admin")
        elif len(profiles) > 1:
            return redirect("skalvi:choose")
        else:
            for profile in profiles:
                profile.is_active = True
                profile.save()
            return redirect("/")






