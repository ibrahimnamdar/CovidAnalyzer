using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace CovidAnalyzer.Controllers
{
    public abstract class CovidAnalyzerControllerBase: AbpController
    {
        protected CovidAnalyzerControllerBase()
        {
            LocalizationSourceName = CovidAnalyzerConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
