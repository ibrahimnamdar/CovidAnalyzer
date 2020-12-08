using System.Threading.Tasks;
using Abp.Application.Services;
using CovidAnalyzer.Authorization.Accounts.Dto;

namespace CovidAnalyzer.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
