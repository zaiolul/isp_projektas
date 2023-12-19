
using ISP_PROJEKTAS.Server.Models;

using Microsoft.EntityFrameworkCore;


namespace WarehelperAPI.Data
{
	public class MoltDbContext : DbContext
	{
		private readonly IConfiguration configuration;
		public DbSet<Patiekalas> patiekalas { get; set; }
		public DbSet<Restoranas> restoranas { get; set; }
		public DbSet<KrepselioPreke> krepselio_Preke { get; set; }

		public DbSet<Ingredientas> ingredientas { get; set; }
		public DbSet<Ingredientai> ingredientai { get; set; }

		public DbSet<Krepselis> krepselis { get; set; }
		public DbSet<Uzsakymas> uzsakymas { get; set; }
		public DbSet<RestoranoKategorija> restorano_Kategorija { get; set; }
		public DbSet<Kategorija> kategorija { get; set; }

		public MoltDbContext(IConfiguration configuration)
		{
			this.configuration = configuration;
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseMySQL("Server=localhost;Database=isp;User Id=root;Password=test;Convert Zero Datetime=True;");
		}
	}
}