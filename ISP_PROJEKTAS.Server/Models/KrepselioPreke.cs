using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
	public class KrepselioPreke
	{
		[Column("kiekis")]
		public int Kiekis { get; set; }

		[Key]
		[Column("id_Krepselio_preke")]
		public int KrepselioPrekeID { get; set; }

		[Column("fk_Patiekalasid_Patiekalas")]
		public int FKPatiekalasID { get; set; }

		[Column("fk_Uzsakymasid_Uzsakymas")]
		public int FKUzsakymasID { get; set; }
	}
}