
using ISP_PROJEKTAS.Server.Models;

using Microsoft.EntityFrameworkCore;


namespace WarehelperAPI.Data
{
	public class MoltDbContext : DbContext
	{
		private readonly IConfiguration configuration;
		public DbSet<Patiekalas> patiekalas { get; set; }
		public DbSet<Restoranas> restoranas { get; set; }

		public MoltDbContext(IConfiguration configuration)
		{
			this.configuration = configuration;
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseMySQL("Server=localhost;Database=ispdb;User Id=root;Password=test;Convert Zero Datetime=True;");
		}
	}
}