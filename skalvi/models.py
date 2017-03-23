# Create your models here.

from django.db import models
from django.contrib.auth.models import Permission, User

from django.db.models.signals import post_save
from django.dispatch import receiver

from jsonfield import JSONField


ACTIVITY_TYPES = (
    (0, 'Ukjent'),
    (1, 'Skating'),
    (2, 'Klatring'),
    (3, 'Ski'),
    (4, 'Svømming'),
)

SUITED_FOR_TYPES = (
    (0, 'Ukjent'),
    (1, 'Tilpasset 1'),
    (2, 'Tilpasset 2'),
    (3, 'Tilpasset 3'),
    (4, 'Tilpasset 4'),
)

########### USER PROFILES that extends the auth.models.User table

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')  # set the relation / extension to the user model
    type = models.CharField(max_length=5)  # A = admin, P = parent, C = child, etc.
    phone = models.CharField(max_length=8, null=True, blank=True)  # 90 90 99 09 <-- gives length 8
    profile_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=False)
    is_provider = models.BooleanField(default=False)
    aktordatabase = JSONField()  # contains all found information



########### END USER PROFILE

class Activity(models.Model):
    activityName = models.CharField(max_length=80)
    activityType = models.PositiveSmallIntegerField(choices=ACTIVITY_TYPES, default=0)  # Defaults to 'Ukjent'
    suitedForType = models.PositiveSmallIntegerField(choices=SUITED_FOR_TYPES, default=0)  # Defaults to 'Ukjent'
    provider = models.CharField(max_length=80)
    facebookID = models.IntegerField(blank=True, null=True)
    facebookInfo = models.BooleanField(blank=True)
    adaptions = models.TextField()
    age = models.CharField(max_length=80)
    location = models.CharField(max_length=80)
    description = models.TextField()
    registration_required = models.BooleanField()
    price = models.IntegerField()
    date = models.DateField()
    date_end = models.DateField()
    time_start = models.TimeField()
    time_end = models.TimeField()
    images = models.ImageField(upload_to='images/',max_length=255, blank=True)
    instagram = models.TextField(blank=True)
    videos = models.ImageField(upload_to='videos/',max_length=255, blank=True)

    def was_published(self):
        return self.pub_date

    def __str__(self):
        return self.activityName


class Organisation(models.Model):
    # not every provider has a org.number, but most do. to handle this we use
    # auto increment, thus not specifying primary key, and lets Django handle this.
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  # set the relation / extension to the user model
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)  # set the relation / extension to the user model
    aktordatabase = JSONField()  # contains all found information


    def __str__(self):
        if(self.userprofile):
            return self.userprofile.profile_name
        else:
            return 'Ikke koblet mot brukerprofil'



###########  Relations tables  ##########

class ParticipateIn(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    activityId = models.ForeignKey(Activity, on_delete=models.CASCADE)
    user_profile_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)


class Hosts(models.Model):
    activityId = models.OneToOneField(Activity, on_delete=models.CASCADE)
    adminId = models.ForeignKey(User, on_delete=models.CASCADE)
    # orgNr = models.ForeignKey(Organisation, on_delete=models.CASCADE) <-- should get the same information through the
    # admin user reference.


class EmployedIn(models.Model):
    orgNr = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    userId = models.OneToOneField(User, on_delete=models.CASCADE)


