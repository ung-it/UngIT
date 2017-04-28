from django.db import models
from django.contrib.auth.models import Permission, User
from jsonfield import JSONField

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    type = models.CharField(max_length=5)  # A = admin, P = parent, C = child, etc.
    profile_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=60, null=False, blank=False)
    phone = models.CharField(max_length=8, null=True, blank=True)

    is_active = models.BooleanField(default=False)
    provider = models.TextField(default="", blank=True)  # contains all found information

    def __str__(self):
        return self.profile_name + " " + " " + self.last_name + " - Email: " + self.email

class Activity(models.Model):
    activityName = models.CharField(max_length=80)
    activityType = models.CharField(max_length=80)
    provider = models.CharField(max_length=80)
    facebookID = models.IntegerField(blank=True, null=True)
    facebookInfo = models.BooleanField(blank=True)
    adaptions = models.TextField(blank=True)
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
    rating = models.FloatField(blank=True, default=0)
    number_of_ratings = models.IntegerField(blank=True, default=0)
    assistants_number = models.IntegerField()
    assistants_text = models.TextField(blank=True, null=True)

    def was_published(self):
        return self.pub_date

    def __str__(self):
        return self.activityName

class Organisation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)
    aktordatabase = JSONField()

    def __str__(self):
        if self.userprofile:
            return self.userprofile.profile_name
        elif self.aktordatabase:
            return self.aktordatabase['Navn']
        else:
            return 'Mangler informasjon'

class Commentary(models.Model):
    activityId = models.ForeignKey(Activity, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    userProfile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    userProfile_name = models.TextField()
    comment = models.TextField()
    date = models.DateField()
    time = models.TimeField()

class ParticipateIn(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    activityId = models.ForeignKey(Activity, on_delete=models.CASCADE)
    user_profile_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.activityId.activityName + " - " + self.user_profile_id.profile_name + " - Email: " + self.user_profile_id.email

class Hosts(models.Model):
    activityId = models.OneToOneField(Activity, on_delete=models.CASCADE)
    adminId = models.ForeignKey(User, on_delete=models.CASCADE)
    profileId = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.activityId.activityName + " hosted by " + self.adminId.username + " : " + self.profileId.profile_name + " " + self.profileId.last_name)

class EmployedIn(models.Model):
    orgNr = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    userId = models.OneToOneField(User, on_delete=models.CASCADE)

class Follows(models.Model):
    orgId = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    user_profile_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
