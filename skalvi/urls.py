from django.conf.urls import url

from . import views
from . import ApiFunctions

app_name = 'skalvi'
urlpatterns = [
    url(r'^allactivities/', views.allactivities, name='allactivities'),
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.UserFormView.as_view(), name="register"),
    url(r'^activity/(?P<pk>\d+)/$', views.ActivityView.as_view(), name="activity"),
    url(r'^editActivity/$', views.editActivity, name="edit-activity"),
    url(r'^api/skalvi/login/$', ApiFunctions.loginView, name="login"),
    url(r'^api/activities/$', views.getActivities, name="getActivities"),
    url(r'^api/activity/(?P<id>[0-9]+)/$', views.getActivity, name="getActivity"),
    url(r'^register/$', views.UserFormView.as_view(), name="register"),
    url(r'^mypage/(?P<pk>[0-9]+)$', views.MyPageView.as_view(), name='mypage'),
]
