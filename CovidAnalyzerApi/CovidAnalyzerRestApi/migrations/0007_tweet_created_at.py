# Generated by Django 3.1.4 on 2021-01-18 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CovidAnalyzerRestApi', '0006_auto_20210110_2134'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='created_at',
            field=models.CharField(max_length=1000, null=True),
        ),
    ]
