using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CovidAnalyzer.Authorization;

namespace CovidAnalyzer
{
    [DependsOn(
        typeof(CovidAnalyzerCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class CovidAnalyzerApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<CovidAnalyzerAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(CovidAnalyzerApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
