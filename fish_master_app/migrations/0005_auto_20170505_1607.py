# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-05 16:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fish_master_app', '0004_auto_20170505_1529'),
    ]

    operations = [
        migrations.AddField(
            model_name='gameuser',
            name='nickname',
            field=models.CharField(default='sb', max_length=6),
        ),
        migrations.AlterField(
            model_name='gameuser',
            name='password',
            field=models.CharField(max_length=16),
        ),
        migrations.AlterField(
            model_name='gameuser',
            name='username',
            field=models.CharField(max_length=12, unique=True),
        ),
    ]