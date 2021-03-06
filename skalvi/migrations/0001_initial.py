# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-24 10:28
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activityName', models.CharField(max_length=80)),
                ('provider', models.CharField(max_length=80)),
                ('adaptions', models.TextField()),
                ('age', models.CharField(max_length=80)),
                ('location', models.CharField(max_length=80)),
                ('description', models.TextField()),
                ('registration', models.BooleanField()),
                ('date', models.DateField()),
                ('time_start', models.TimeField()),
                ('time_end', models.TimeField()),
                ('images', models.CharField(max_length=200)),
                ('videos', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='EmployedIn',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Hosts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activityId', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='skalvi.Activity')),
                ('adminId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Organisation',
            fields=[
                ('orgNumber', models.CharField(max_length=9, primary_key=True, serialize=False)),
                ('orgName', models.CharField(max_length=40)),
                ('phone', models.CharField(max_length=8)),
                ('email', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='ParticipateIn',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activityId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='skalvi.Activity')),
                ('userId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=5)),
                ('phone', models.CharField(blank=True, max_length=8, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='employedin',
            name='orgNr',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='skalvi.Organisation'),
        ),
        migrations.AddField(
            model_name='employedin',
            name='userId',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
