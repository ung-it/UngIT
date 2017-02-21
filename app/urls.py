from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^skalvi/', include('skalvi.urls')),
    url(r'^admin/', admin.site.urls),
]