using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
	public class Restoranas
	{
		[Key]
		[Column("id_Restoranas")]
		public int RestoranasID { get; set; }

		[Column("pavadinimas")]
		public string Pavadinimas { get; set; }

		[Column("miestas")]
		public string Miestas { get; set; }

		[Column("adresas")]
		public string Adresas { get; set; }

		[Column("saskaita")]
		public string Saskaita { get; set; }

		[Column("uzsakymo_mokestis")]
		public float UzsakymoMokestis { get; set; }

		[Column("aprasymas")]
		public string Aprasymas { get; set; }

		[Column("tel_numeris")]
		public string TelNumeris { get; set; }

		[Column("atidarymo_laikas")]
		public string AtidarymoLaikas { get; set; }

		[Column("uzdarymo_laikas")]
		public string UzdarymoLaikas { get; set; }

		[Column("minimali_uzsakymo_kaina")]
		public float MinimaliUzsakymoKaina { get; set; }

		[Column("nuotrauka")]
		public string Nuotrauka { get; set; }

		[Column("brangumas")]
		public int Brangumas { get; set; }

		//[Column("fk_Restorano_valdytojasid_Naudotojas")]
		//public int FKRestoranoValdytojasId { get; set; }
	}
}
