from django.contrib import admin
from .models import Tweet, TweetScore

# Register your models here.
admin.site.register(Tweet)
admin.site.register(TweetScore)
