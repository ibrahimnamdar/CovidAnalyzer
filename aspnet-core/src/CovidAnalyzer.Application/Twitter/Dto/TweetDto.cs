using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CovidAnalyzer.Entities;

namespace CovidAnalyzer.Twitter.Dto
{
    [AutoMapFrom(typeof(Tweet))]
    public class TweetDto : EntityDto<int>
    {
    }
}
