# Generated by Django 3.1.4 on 2021-01-09 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CovidAnalyzerRestApi', '0002_tweet_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tweet',
            name='body',
        ),
        migrations.RemoveField(
            model_name='tweet',
            name='name',
        ),
        migrations.AddField(
            model_name='tweet',
            name='text',
            field=models.CharField(max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='tweet',
            name='id',
            field=models.CharField(max_length=1000, primary_key=True, serialize=False),
        ),
    ]
