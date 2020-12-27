using Abp.Localization;
using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using CovidAnalyzer.Authorization.Roles;
using CovidAnalyzer.Authorization.Users;
using CovidAnalyzer.Entities;
using CovidAnalyzer.MultiTenancy;

namespace CovidAnalyzer.EntityFrameworkCore
{
    public class CovidAnalyzerDbContext : AbpZeroDbContext<Tenant, Role, User, CovidAnalyzerDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public DbSet<Tweet> Tweets { get; set; }

        public CovidAnalyzerDbContext(DbContextOptions<CovidAnalyzerDbContext> options)
            : base(options)
        {
        }

        // add these lines to override max length of property
        // we should set max length smaller than the PostgreSQL allowed size (10485760)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationLanguageText>()
                .Property(p => p.Value)
                .HasMaxLength(100); // any integer that is smaller than 10485760
        }
    }
}
