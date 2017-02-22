from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^activities/', views.activites, name='activities'),
    url(r'^$', views.index, name='index'),
]