from django.conf.urls import url

from . import views

app_name = 'skalvi'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/activities/$', views.getActivities, name="getActivities"),
    url(r'^api/activity/(?P<id>[0-9]+)/$', views.getActivity, name="getActivity"),
    url(r'^register/$', views.UserFormView.as_view(), name="register"),
    url(r'^mypage/(?P<pk>[0-9]+)$', views.MyPageView.as_view(), name='mypage'),
]
