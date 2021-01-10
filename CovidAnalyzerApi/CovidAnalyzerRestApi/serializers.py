from rest_framework import serializers

from .models import Tweet
from .models import TweetScore


class TweetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tweet
        fields = ('id', 'text')


class TweetScoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TweetScore
        fields = ('id', 'tweet_score', 'date')
