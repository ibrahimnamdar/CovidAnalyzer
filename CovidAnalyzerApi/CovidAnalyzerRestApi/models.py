from django.db import models


# Create your models here.
class Tweet(models.Model):
    id = models.CharField(max_length=1000, primary_key=True)
    text = models.CharField(max_length=5000, null=True)

    def __str__(self):
        return self.text


class TweetScore(models.Model):
    id = models.AutoField(primary_key=True)
    tweet_score = models.FloatField(default=0, null=True)
    date = models.DateField(null=True)

    def __str__(self):
        return str(self.tweet_score)
