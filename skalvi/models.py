# Create your models here.

from django.db import models
from django.utils import timezone


class Users(models.Model):
    # attributes:
    email = models.EmailField()
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=80)
    password = models.CharField(max_length=20)
    type = models.CharField(max_length=1) # A = admin, P = parent, C = child, etc.
    phone = models.CharField(max_length=8) # 90 90 99 09 <-- gives length 8

    def __str__(self):
        return self.first_name + " " + self.last_name


class Activity(models.Model):
    actName = models.CharField(max_length=80)
    location = models.CharField(max_length=80)
    description = models.TextField()
    ingress = models.CharField(max_length=100)
    pub_date = models.DateTimeField('date published')

    def was_published(self):
        return self.pub_date


class Organisation(models.Model):
    orgNumber = models.CharField(max_length=9)
    orgName = models.CharField(max_length=40)
    phone = models.CharField(max_length=8)
    email = models.CharField(max_length=40)

    def __str__(self):
        return self.orgName + ": org. number: " + self.orgNumber