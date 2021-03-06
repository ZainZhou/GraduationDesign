# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-04 03:51
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fish_master_app', '0002_auto_20170429_0914'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0, verbose_name='得分')),
                ('username', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='fish_master_app.Gameuser')),
            ],
            options={
                'verbose_name': '游戏得分',
                'verbose_name_plural': '游戏得分',
                'ordering': ['score'],
            },
        ),
    ]
