using System.Threading.Tasks;
using Abp.Application.Services;
using CovidAnalyzer.Sessions.Dto;

namespace CovidAnalyzer.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
