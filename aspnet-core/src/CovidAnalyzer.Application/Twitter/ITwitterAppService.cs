using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using CovidAnalyzer.Twitter.Dto;
using Tweetinvi.Models.V2;

namespace CovidAnalyzer.Twitter
{
    public interface ITwitterAppService : IAsyncCrudAppService<TweetDto, int, PagedTweetResultRequestDto, TweetDto, TweetDto>
    {
        Task<List<TweetV2>> SearchTweets();
    }
}
