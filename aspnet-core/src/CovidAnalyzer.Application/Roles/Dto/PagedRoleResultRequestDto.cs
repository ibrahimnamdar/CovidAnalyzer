using Abp.Application.Services.Dto;

namespace CovidAnalyzer.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

