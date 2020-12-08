using System.Threading.Tasks;
using CovidAnalyzer.Configuration.Dto;

namespace CovidAnalyzer.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
