from django.contrib.auth import authenticate, login  # Login module handles sessions
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import *

import json


# Login view, method = POST.
@csrf_exempt
def loginView(request):

    json_string = request.body.decode('utf-8')  # request becomes string
    json_string = json_string.split("&")

    username = json_string[0].split("=")[1]
    password = json_string[1].split("=")[1]

    user = authenticate(username=username, password=password)

    # Check that we got a user back
    if user is not None:
        if user.is_active:
            if user.is_authenticated():
                login(request, user)
                print(request.session.session_key)
                print("Successfully logged in")
                return redirect("skalvi:index")

            print("HALLOOOOOOO")
        print("AIOLI")

    print("Not logged in!")
    return render(request, template_name="register.html")

@csrf_exempt
def loginFacebook(request):
    print("Request", request.body)
    json_string = request.body.decode('utf-8')  # request becomes string
    parsed_json = json.loads(json_string)

    if "email" in json_string:
        email = parsed_json["email"]
    else:
        email = ""

    facebookId = parsed_json["id"]
    first_name = parsed_json["first_name"]
    last_name = parsed_json["last_name"]
    age = parsed_json["age_range"]

    password = facebookId[:5] + first_name
    user = authenticate(username=facebookId, password=password)

    if user is None:
        user = User(username=facebookId, email=email, first_name=first_name, last_name=last_name, is_staff=False)
        user.set_password(facebookId[:5] + first_name)
        user.save()

        if age >= 21:
            type = "P"
        else:
            type = "C"

        userProfile = UserProfile(user=user, type=type, phone=None, profile_name=first_name)
        userProfile.save()

    login(request, user)
    return redirect("skalvi:index")









