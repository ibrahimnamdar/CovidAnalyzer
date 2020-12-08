using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace CovidAnalyzer.EntityFrameworkCore
{
    public static class CovidAnalyzerDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<CovidAnalyzerDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<CovidAnalyzerDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
