# Generated by Django 4.1.1 on 2022-10-16 00:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_alter_audio_summary"),
    ]

    operations = [
        migrations.RemoveField(model_name="audio", name="summary",),
    ]
