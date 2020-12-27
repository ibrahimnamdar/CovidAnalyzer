using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Configuration;
using Abp.Domain.Repositories;
using CovidAnalyzer.Configuration;
using CovidAnalyzer.Entities;
using CovidAnalyzer.Twitter.Dto;
using CovidAnalyzer.Users;
using Newtonsoft.Json;
using Tweetinvi;
using Tweetinvi.Models.V2;
using Tweetinvi.Parameters.V2;

namespace CovidAnalyzer.Twitter
{
    public class TwitterAppService : AsyncCrudAppService<Tweet, TweetDto, int, PagedTweetResultRequestDto, TweetDto, TweetDto>, ITwitterAppService
    {
        private readonly TwitterClient _twitterClient;
        private readonly ISettingManager _settingManager;

        public TwitterAppService(IRepository<Tweet> repository, ISettingManager settingManager)
            : base(repository)
        {
            _settingManager = settingManager;
            _twitterClient = new TwitterClient( _settingManager.GetSettingValueAsync(AppSettingNames.TwitterConsumerKey).Result,
                _settingManager.GetSettingValueAsync(AppSettingNames.TwitterConsumerSecret).Result,
                _settingManager.GetSettingValueAsync(AppSettingNames.TwitterAccessToken).Result,
                _settingManager.GetSettingValueAsync(AppSettingNames.TwitterAccessTokenSecret).Result);
        }

        public async Task<List<TweetV2>> SearchTweets()
        {
            var tweets = await _twitterClient.SearchV2.SearchTweetsAsync(new SearchTweetsV2Parameters("covid")
            {
                PageSize = 10,
            });

            return tweets.Tweets.ToList();
        }
    }
}
