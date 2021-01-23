# myapi/urls.py
from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r'tweets', views.TweetViewSet)
router.register(r'tweetScores', views.TweetScoreViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token-auth/', obtain_jwt_token)
]
