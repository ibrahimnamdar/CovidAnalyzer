using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using CovidAnalyzer.Authorization.Roles;
using CovidAnalyzer.Authorization.Users;
using CovidAnalyzer.MultiTenancy;

namespace CovidAnalyzer.EntityFrameworkCore
{
    public class CovidAnalyzerDbContext : AbpZeroDbContext<Tenant, Role, User, CovidAnalyzerDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public CovidAnalyzerDbContext(DbContextOptions<CovidAnalyzerDbContext> options)
            : base(options)
        {
        }
    }
}
