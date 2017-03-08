# Create your models here.

from django.db import models
from django.contrib.auth.models import Permission, User

from django.db.models.signals import post_save
from django.dispatch import receiver



########### USER PROFILES that extends the auth.models.User table

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')  # set the relation / extension to the user model
    type = models.CharField(max_length=5)  # A = admin, P = parent, C = child, etc.
    phone = models.CharField(max_length=8, null=True, blank=True)  # 90 90 99 09 <-- gives length 8
    profile_name = models.CharField(max_length=30)



########### END USER PROFILE

class Activity(models.Model):
    activityName = models.CharField(max_length=80)
    provider = models.CharField(max_length=80)
    adaptions = models.TextField()
    age = models.CharField(max_length=80)
    location = models.CharField(max_length=80)
    description = models.TextField()
    registration_required = models.BooleanField()
    price = models.IntegerField()
    date = models.DateField()
    time_start = models.TimeField()
    time_end = models.TimeField()
    images = models.ImageField(upload_to='images/',max_length=200, blank=True)
    instagram = models.TextField(blank=True)
    videos = models.ImageField(upload_to='videos/',max_length=200, blank=True)

    def was_published(self):
        return self.pub_date


class Organisation(models.Model):
    orgNumber = models.CharField(max_length=9, primary_key=True)
    orgName = models.CharField(max_length=40)
    phone = models.CharField(max_length=8)
    email = models.CharField(max_length=40)

    def __str__(self):
        return self.orgName + ": org. number: " + self.orgNumber


###########  Relations tables  ##########

class ParticipateIn(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    activityId = models.ForeignKey(Activity, on_delete=models.CASCADE)


class Hosts(models.Model):
    activityId = models.OneToOneField(Activity, on_delete=models.CASCADE)
    adminId = models.ForeignKey(User, on_delete=models.CASCADE)
    # orgNr = models.ForeignKey(Organisation, on_delete=models.CASCADE) <-- should get the same information through the
    # admin user reference.


class EmployedIn(models.Model):
    orgNr = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    userId = models.OneToOneField(User, on_delete=models.CASCADE)


