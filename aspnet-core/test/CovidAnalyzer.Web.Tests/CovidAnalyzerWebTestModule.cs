using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CovidAnalyzer.EntityFrameworkCore;
using CovidAnalyzer.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace CovidAnalyzer.Web.Tests
{
    [DependsOn(
        typeof(CovidAnalyzerWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class CovidAnalyzerWebTestModule : AbpModule
    {
        public CovidAnalyzerWebTestModule(CovidAnalyzerEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CovidAnalyzerWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(CovidAnalyzerWebMvcModule).Assembly);
        }
    }
}