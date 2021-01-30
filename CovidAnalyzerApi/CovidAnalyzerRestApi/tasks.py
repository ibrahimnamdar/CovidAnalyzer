from .models import Tweet, TweetScore
import twitterSentiment
import os
from datetime import date
from datetime import timedelta
from decouple import config


def seed_tweets_daily():
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
        tweet_score_id = int(f'{current_day.day}{current_day.month}{current_day.year}')
        TweetScore.objects.create(id=tweet_score_id, tweet_score=score, date=current_day)

    return 1;
