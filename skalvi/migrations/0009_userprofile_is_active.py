# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-07 11:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skalvi', '0008_merge_20170307_1238'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
