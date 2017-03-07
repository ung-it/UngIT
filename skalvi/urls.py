from django.conf.urls import url

from . import views
from . import ApiFunctions

app_name = 'skalvi'
urlpatterns = [
    url(r'^allactivities/', views.allactivities, name='allactivities'),
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.UserFormView.as_view(), name="register"),
    url(r'^activity/$', views.createActivity.as_view(), name="create-activity"),
    url(r'^activity/(?P<pk>\d+)/$', views.ActivityView.as_view(), name="edit-activity"),
    url(r'^api/skalvi/login/$', views.loginView, name="login"),
    url(r'^api/skalvi/loginF/$', ApiFunctions.loginFacebook, name="loginFacebook"),
    url(r'^api/activities/$', views.getActivities, name="getActivities"),
    url(r'^api/activity/(?P<id>[0-9]+)/$', views.getActivity, name="get-activity"),
    url(r'^register/$', views.UserFormView.as_view(), name="register"),
    url(r'^mypage/$', views.MyPageView.as_view(), name='mypage'),
    url(r'^mypage/$', views.MyPageView.post, name='mypageregister'),
    url(r'^logout_user/$', views.logout_user, name='logout_user')

]
