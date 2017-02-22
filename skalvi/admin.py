from django.contrib import admin

# Register your models here.
from .models import *

# admin.site.register(User)
admin.site.register(Activity)
admin.site.register(Organisation)
admin.site.register(ParticipateIn)
admin.site.register(Hosts)
admin.site.register(EmployedIn)

