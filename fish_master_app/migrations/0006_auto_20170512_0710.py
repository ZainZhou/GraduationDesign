# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-12 07:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fish_master_app', '0005_auto_20170505_1607'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gameuser',
            name='nickname',
            field=models.CharField(default='sb', max_length=6, unique=True),
        ),
    ]
