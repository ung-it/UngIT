from django.contrib.auth import authenticate, login  # Login module handles sessions
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
import json


# Login view, method = POST.
@csrf_exempt
def loginView(request):
    json_string = request.body.decode('utf-8') # request becomes string
    parsed_json = json.loads(json_string)

    username = parsed_json['username']
    password = parsed_json['password']


    user = authenticate(username=username, password=password)

    # Check that we got a user back
    if user is not None:
        if user.is_active:
            login(request, user)
            print("Successfully logged in")

            return redirect("skalvi:index")

    print("Not logged in!")
    return render(request, template_name="register.html")
