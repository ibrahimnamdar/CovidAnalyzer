using Abp.Application.Services;
using CovidAnalyzer.MultiTenancy.Dto;

namespace CovidAnalyzer.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

