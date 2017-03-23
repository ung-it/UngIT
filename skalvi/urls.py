from django.conf.urls import url

from . import views
from . import ApiFunctions

app_name = 'skalvi'
urlpatterns = [
    # Index
    url(r'^$', views.index, name='index'),
    # Log in and out
    url(r'^api/skalvi/login/$', views.loginView, name="login"),
    url(r'^api/skalvi/loginF/$', ApiFunctions.loginFacebook, name="loginFacebook"),
    url(r'^logout_user/$', views.logout_user, name='logout_user'),
    # Register
    url(r'^register/$', views.UserFormView.as_view(), name="register"),
    url(r'^registerProfile/$', views.RegisterProfileView.as_view(), name='registerProfile'),
    url(r'^registerProfile/$', views.RegisterProfileView.post, name='registerProfile'),
    # SubUsers
    url(r'^choose/$', views.ChooseUserView.as_view(), name='choose'),
    url(r'^selected/$', views.selectedUser, name='selected'),
    # Activity Views
    url(r'^activity/$', views.createActivity.as_view(), name="create-activity"),
    url(r'^activity/(?P<pk>\d+)/$', views.ActivityView.as_view(), name="edit-activity"),
    url(r'^allactivities/', views.allactivities, name='allactivities'),
    # Get activities
    url(r'^api/activities/$', views.getActivities, name="getActivities"),
    url(r'^api/activity/(?P<id>[0-9]+)/$', views.getActivity, name="get-activity"),
    url(r'^api/attendingActivities/[a-zA-Z]+/$', views.getAttendingActivities, name="getAttendingActivities"),
    url(r'^api/hostingActivities/[a-zA-Z]+/$', views.getHostingActivities, name="getHostingActivities"),
    # MyPage
    url(r'^mypage/$', views.MyPageView.as_view(), name='mypage'),
    url(r'^mypage/(?P<id>[a-zA-Z]+)/$', views.MyPageView.as_view(), name='mypage'),
    # Sign up and off
    url(r'^signupActivity/$', views.signUpActivity, name='signupActivity'),
    url(r'^checkIfSignedUp/$', views.checkIfSingedUp, name='checkIfSignedUp'),
    url(r'^signOfEvent/$', views.signOfEvent, name='signOfEvent'),


    url(r'^rateActivity/$', views.rateActivity, name='rateActivity'),
    url(r'^postComment/$', views.postComment, name='postComment')


]
