using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CovidAnalyzer.Configuration;
using CovidAnalyzer.EntityFrameworkCore;
using CovidAnalyzer.Migrator.DependencyInjection;

namespace CovidAnalyzer.Migrator
{
    [DependsOn(typeof(CovidAnalyzerEntityFrameworkModule))]
    public class CovidAnalyzerMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public CovidAnalyzerMigratorModule(CovidAnalyzerEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(CovidAnalyzerMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                CovidAnalyzerConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CovidAnalyzerMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
