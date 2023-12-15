
using ISP_PROJEKTAS.Server.Models;

using Microsoft.EntityFrameworkCore;


namespace WarehelperAPI.Data
{
    public class MoltDbContext : DbContext
    {
        private readonly IConfiguration configuration;
        public DbSet<Patiekalas> Patiekalai { get; set; }

        public MoltDbContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        {
            optionsBuilder.UseMySQL(configuration.GetConnectionString("MySQL"));
        }
    }
}
