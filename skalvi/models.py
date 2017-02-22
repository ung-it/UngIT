# Create your models here.

from django.db import models
from django.utils import timezone


class Users(models.Model):
    # attributes:
    email = models.EmailField(primary_key=True)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=80)
    password = models.CharField(max_length=20)
    type = models.CharField(max_length=1)  # A = admin, P = parent, C = child, etc.
    phone = models.CharField(max_length=8)  # 90 90 99 09 <-- gives length 8



    def __str__(self):
        return self.first_name + " " + self.last_name


class Activity(models.Model):
    activityName = models.CharField(max_length=80)
    location = models.CharField(max_length=80)
    description = models.TextField()
    ingress = models.CharField(max_length=100)
    pub_date = models.DateTimeField('date published')

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
    userId = models.ForeignKey(Users, on_delete=models.CASCADE)
    activityId = models.ForeignKey(Activity, on_delete=models.CASCADE)


class Hosts(models.Model):
    activityId = models.OneToOneField(Activity, on_delete=models.CASCADE)
    adminId = models.ForeignKey(Users, on_delete=models.CASCADE)
    # orgNr = models.ForeignKey(Organisation, on_delete=models.CASCADE) <-- should get the same information through the
    # admin user reference.


class EmployedIn(models.Model):
    orgNr = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    userId = models.OneToOneField(Users, on_delete=models.CASCADE)


