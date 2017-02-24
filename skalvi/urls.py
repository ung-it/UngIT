from django.conf.urls import url

from . import views

app_name = 'skalvi'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.UserFormView.as_view(), name="register"),
    url(r'^/api/skalvi/login/$', views.loginView, name="register"),
]
