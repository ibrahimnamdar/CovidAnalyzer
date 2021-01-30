from rest_framework.decorators import action
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
# Create your views here.
from rest_framework import viewsets
import statistics

from .serializers import TweetSerializer, TweetScoreSerializer
from .models import Tweet, TweetScore

from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view
from searchtweets import ResultStream, gen_request_parameters, load_credentials, collect_results
import twitterSentiment
import os
from datetime import date
from datetime import timedelta
import tagme
from decouple import config
import nltk
from nltk.tokenize import RegexpTokenizer
import jsonpickle

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    url(r'^$', schema_view)
]


class TweetScoreViewSet(viewsets.ModelViewSet):
    queryset = TweetScore.objects.all().order_by('date')
    serializer_class = TweetScoreSerializer

    @action(detail=False, methods=['get'])
    def get_tweet_scores(self, request):
        tweet_scores = TweetScore.objects.all().order_by('date').values_list('tweet_score', flat=True)
        dates = TweetScore.objects.all().order_by('date').values_list('date', flat=True)
        return Response({'tweet_scores': tweet_scores, 'dates': dates,
                         'average_tweet_score': round(statistics.mean(tweet_scores) * 10, 1)})

    @action(detail=False, methods=['get'])
    def get_frequent_entities(self, request):
        # tagme.GCUBE_TOKEN = config('GCUBE_TOKEN')
        texts = ''
        for tweet in Tweet.objects.all():
            texts += tweet.text

        # tokenized_words  = nltk.classify.naivebayes.NaiveBayesClassifier.most_informative_features(texts)

        tokenizer = RegexpTokenizer(r'\w+')
        allWords = tokenizer.tokenize(texts)
        allWordDist = nltk.FreqDist(w.lower() for w in allWords)
        stopwords = nltk.corpus.stopwords.words('english')
        allWordExceptStopDist = nltk.FreqDist(w.lower() for w in allWords if w not in stopwords)

        filtered_words = {key: value for key, value in allWordExceptStopDist.items() if value >= 5}

        excluded_words = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "15", "23", "19", "a", "the", "it", "me",
                          "my", "we", "and", "in", "us", "33", "https", "http", "co", "i", "rt", "get"]
        for item in excluded_words:
            filtered_words.pop(item, None)

        sa = sorted(filtered_words.items(), key=lambda x: x[1], reverse=True)
        data_sorted = {k: v for k, v in sorted(filtered_words.items(), key=lambda x: x[1], reverse=True)}
        return Response({'keys': list(data_sorted.keys())[:20], 'values': list(data_sorted.values())[:20]})

    @action(detail=False, methods=['get'])
    def get_most_used_words(self, request):
        tagme.GCUBE_TOKEN = config('GCUBE_TOKEN')
        texts = ''
        for tweet in Tweet.objects.all():
            texts += tweet.text

        # tokenized_words  = nltk.classify.naivebayes.NaiveBayesClassifier.most_informative_features(texts)

        tokenizer = RegexpTokenizer(r'\w+')
        allWords = tokenizer.tokenize(texts)
        allWordDist = nltk.FreqDist(w.lower() for w in allWords)
        stopwords = nltk.corpus.stopwords.words('english')
        allWordExceptStopDist = nltk.FreqDist(w.lower() for w in allWords if w not in stopwords)

        filtered_words = {key: value for key, value in allWordExceptStopDist.items() if value >= 5}

        excluded_words = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "15", "23", "19", "a", "the", "it", "me",
                          "my", "we", "and", "in", "us", "33", "https", "http", "co", "i", "rt", "get"]
        for item in excluded_words:
            filtered_words.pop(item, None)

        sa = sorted(filtered_words.items(), key=lambda x: x[1], reverse=True)
        data_sorted = {k: v for k, v in sorted(filtered_words.items(), key=lambda x: x[1], reverse=True)}
        most_used_words = []

        for item in list(filtered_words.items())[:100]:
            most_used_words.append({'text': item[0], 'value': item[1]})
        return Response({'most_used_words': most_used_words})


class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all().order_by('id')
    serializer_class = TweetSerializer

    @action(detail=False, methods=['get'])
    def get_latest_tweets(self, request):
        tweets = Tweet.objects.all().order_by('created_at')
        serializer = self.get_serializer(tweets)
        return Response(serializer.data)

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
        twitter_client_key = config('TWITTER_CLIENT_KEY')
        twitter_client_secret = config('TWITTER_CLIENT_SECRET')
        os.environ.setdefault("TWITTER_CLIENT_KEY", twitter_client_key)
        os.environ.setdefault("TWITTER_CLIENT_SECRET", twitter_client_secret)

        api = twitterSentiment.API()
        today = date.today()

        for i in range(7):
            current_day = today - timedelta(days=i)

            tweet = api.querySearch(q='covid', geocode=None, lang='en', result_type='recent', count=100,
                                    until=current_day.strftime('%Y-%m-%d'),
                                    since_id=None, max_id=None, include_entities=False, tweet_mode="extended",
                                    return_json=True)
            data = twitterSentiment.StructureStatusesData(tweet)

            for item in tweet['statuses']:
                Tweet.objects.create(id=item['id'], text=item['full_text'], created_at=item['created_at'])

            structured_tweets = data.getTweet()
            sentiment = twitterSentiment.SentimentScore(structured_tweets)
            score = sentiment.getSentimentClassification()
            TweetScore.objects.create(tweet_score=score, date=current_day)
        return Response(1)

    @action(detail=False, methods=['get'])
    def search(self, request):
        twitter_client_key = config('TWITTER_CLIENT_KEY')
        twitter_client_secret = config('TWITTER_CLIENT_SECRET')
        os.environ.setdefault("TWITTER_CLIENT_KEY", twitter_client_key)
        os.environ.setdefault("TWITTER_CLIENT_SECRET", twitter_client_secret)

        api = twitterSentiment.API()
        today = date.today()

        current_day = today

        tweet = api.querySearch(q='covid ' +request.query_params['keyword'], geocode=None, lang='en', result_type='recent', count=1000,
                                until=current_day.strftime('%Y-%m-%d'),
                                since_id=None, max_id=None, include_entities=False, tweet_mode="extended",
                                return_json=True)
        data = twitterSentiment.StructureStatusesData(tweet)

        structured_tweets = data.getTweet()

        tweets = []
        for item in structured_tweets[:100]:
            tweets.append({'text': item['full_text']})
        sentiment = twitterSentiment.SentimentScore(structured_tweets)
        score = sentiment.getSentimentClassification()

        texts = ''
        for tweet in tweets:
            texts += tweet['text']+ ' '

        # tokenized_words  = nltk.classify.naivebayes.NaiveBayesClassifier.most_informative_features(texts)

        tokenizer = RegexpTokenizer(r'\w+')
        allWords = tokenizer.tokenize(texts)
        allWordDist = nltk.FreqDist(w.lower() for w in allWords)
        stopwords = nltk.corpus.stopwords.words('english')
        allWordExceptStopDist = nltk.FreqDist(w.lower() for w in allWords if w not in stopwords)

        filtered_words = {key: value for key, value in allWordExceptStopDist.items() if value >= 5}

        excluded_words = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "15", "23", "19", "a", "the", "it",
                          "me",
                          "my", "we", "and", "in", "us", "33", "https", "http", "co", "i", "rt", "get"]
        for item in excluded_words:
            filtered_words.pop(item, None)

        sa = sorted(filtered_words.items(), key=lambda x: x[1], reverse=True)
        data_sorted = {k: v for k, v in sorted(filtered_words.items(), key=lambda x: x[1], reverse=True)}

        return Response({'tweets': tweets, 'tweet_score': score, 'keys': list(data_sorted.keys())[:20], 'values': list(data_sorted.values())[:20]})


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
