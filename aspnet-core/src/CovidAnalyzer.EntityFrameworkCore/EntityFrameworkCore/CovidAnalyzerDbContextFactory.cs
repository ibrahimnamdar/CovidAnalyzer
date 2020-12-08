using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using CovidAnalyzer.Configuration;
using CovidAnalyzer.Web;

namespace CovidAnalyzer.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class CovidAnalyzerDbContextFactory : IDesignTimeDbContextFactory<CovidAnalyzerDbContext>
    {
        public CovidAnalyzerDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<CovidAnalyzerDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            CovidAnalyzerDbContextConfigurer.Configure(builder, configuration.GetConnectionString(CovidAnalyzerConsts.ConnectionStringName));

            return new CovidAnalyzerDbContext(builder.Options);
        }
    }
}
