using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
	public class Patiekalas
	{
		[Column("pavadinimas")]
		public string Pavadinimas { get; set; }

		[Column("kaina")]
		public float Kaina { get; set; }

		[Column("meniu_kategorija")]
		public string MeniuKategorija { get; set; }

		[Column("kalorijos")]
		public int Kalorijos { get; set; }

		[Column("aprasymas")]
		public string Aprasymas { get; set; }

		[Column("tinka_veganams")]
		public int TinkaVeganams { get; set; }

		[Column("astrumas")]
		public int Astrumas { get; set; }

		[Column("id_patiekalas")]
		public int PatiekalasID { get; set; }

		[Column("fk_Restoranasid_Restoranas")]
		public int FKRestoranasID { get; set; }

	}
}
