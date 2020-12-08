using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using CovidAnalyzer.Configuration.Dto;

namespace CovidAnalyzer.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : CovidAnalyzerAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
