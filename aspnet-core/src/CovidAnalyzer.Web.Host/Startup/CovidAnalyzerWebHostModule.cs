using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CovidAnalyzer.Configuration;

namespace CovidAnalyzer.Web.Host.Startup
{
    [DependsOn(
       typeof(CovidAnalyzerWebCoreModule))]
    public class CovidAnalyzerWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public CovidAnalyzerWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CovidAnalyzerWebHostModule).GetAssembly());
        }
    }
}
