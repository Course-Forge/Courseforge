# Generated by Django 4.1.1 on 2022-10-15 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_audio_delete_audio_store"),
    ]

    operations = [
        migrations.AddField(
            model_name="audio",
            name="summary",
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
