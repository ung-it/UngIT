from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User


# Register your models here.
from .models import *

# admin.site.register(User)
admin.site.register(Activity)
admin.site.register(Organisation)
admin.site.register(ParticipateIn)
admin.site.register(Hosts)
admin.site.register(EmployedIn)
admin.site.register(UserProfile)


# Define an inline admin descriptor for UserProfile model
# which acts a bit like a singleton

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'User profiles'
    fk_name = 'user'


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline, )


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
