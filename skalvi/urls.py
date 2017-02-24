from django.conf.urls import url

from . import views
from . import ApiFunctions

app_name = 'skalvi'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.UserFormView.as_view(), name="register"),
    url(r'^api/skalvi/login/$', ApiFunctions.loginView, name="login"),
]
