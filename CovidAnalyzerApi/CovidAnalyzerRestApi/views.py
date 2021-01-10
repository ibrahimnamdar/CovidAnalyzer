from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
from rest_framework import viewsets

from .serializers import TweetSerializer, TweetScoreSerializer
from .models import Tweet, TweetScore

from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view
from searchtweets import ResultStream, gen_request_parameters, load_credentials, collect_results
import twitterSentiment
import os
from datetime import date
from datetime import timedelta

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    url(r'^$', schema_view)
]


class TweetScoreViewSet(viewsets.ModelViewSet):
    queryset = TweetScore.objects.all().order_by('id')
    serializer_class = TweetScoreSerializer

    @action(detail=False, methods=['get'])
    def get_tweet_scores(self, request):
        tweet_scores = TweetScore.objects.all().order_by('date')
        return Response(tweet_scores)


class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all().order_by('id')
    serializer_class = TweetSerializer

    @action(detail=False, methods=['get'])
    def seed_tweets(self, request):
        # search_args = load_credentials("C:\\Users\\ihnam\\twitter_keys.yaml",
        #                                yaml_key="search_tweets_v2",
        #                                env_overwrite=True)
        # query = gen_request_parameters("covid lang:en", results_per_call=100)
        # tweets = collect_results(query,
        #                          max_tweets=100,
        #                          result_stream_args=search_args)
        #
        # for tweet in tweets:
        #     if not tweet['id']:
        #         Tweet.objects.create(id=tweet['id'], text=tweet['text'])
        # Don't bother :)
        os.environ.setdefault("TWITTER_CLIENT_KEY", "h09cRFKFvdYHDygrninn4lXFz")
        os.environ.setdefault("TWITTER_CLIENT_SECRET", "paLMnrTaIdP7deOj8ZGGO9Xwj6yh7kwSdwwQneASYHRa08ntbX")

        api = twitterSentiment.API()
        today = date.today()

        for i in range(7):
            current_day = today - timedelta(days=i)

            tweet = api.querySearch(q='covid', geocode=None, lang='en', result_type='recent', count=100,
                                    until=current_day.strftime('%Y-%m-%d'),
                                    since_id=None, max_id=None, include_entities=False, tweet_mode="extended",
                                    return_json=True)
            data = twitterSentiment.StructureStatusesData(tweet)
            structured_tweets = data.getTweet()
            sentiment = twitterSentiment.SentimentScore(structured_tweets)
            score = sentiment.getSentimentClassification()
            TweetScore.objects.create(tweet_score=score, date=current_day)
        return Response(1)
