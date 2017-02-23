from django.http import HttpResponse
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
    return HttpResponse("Hello, world. You're at the SkalVi index.")


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
        print("NEEEI")
        return render(request, self.template_name,
            {
                'form' : form,
                'profile' : profile_form
            })













