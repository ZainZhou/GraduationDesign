# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-05 15:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fish_master_app', '0003_gamehistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gameuser',
            name='age',
            field=models.IntegerField(default=18),
        ),
    ]
