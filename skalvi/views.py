from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login  # Login module handles sessions
from django.views import generic
from django.views.generic import View
from .forms import UserForm, UserProfileForm
from .models import *
from django.contrib.auth.models import User



def index(request):
    return TemplateResponse(request, "home.html", {})


# Login view, method = POST.
def loginView(request):
    username = request.POST['username']
    password = request.POST['password']
    urlToPageFrom = request.POST['page']

    user = authenticate(username=username, password=password)

    # Check that we got a user back
    if user is not None:
        if user.is_active:
            login(request, user)

            return redirect(request, 'skalvi:' + urlToPageFrom)

    return render(request)


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


            # cleaned (normalized) data / formated properly
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

            userProfile = UserProfile(user=user, type=types, phone=phone)
            userProfile.save()


            #Returns User Object if credentials are correct
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
                'form' : form,
                'profile' : profile_form
            })


def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)

