# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-22 12:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skalvi', '0018_auto_20170322_1227'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='is_provider',
            field=models.BooleanField(default=False),
        ),
    ]
