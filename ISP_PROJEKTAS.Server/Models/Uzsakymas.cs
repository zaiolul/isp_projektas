using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
	public class Uzsakymas
	{
		[Column("data")]
		public DateTime Data { get; set; }

		[Column("sumoketa")]
		public int Sumoketa { get; set; }

		[Column("pilna_kaina")]
		public float PilnaKaina { get; set; }

		[Column("apmokejimo_budas")]
		public int ApmokejimoBudas { get; set; }

		[Key]
		[Column("id_Uzsakymas")]
		public int UzsakymasID { get; set; }

		[Column("fk_Klientasid_Naudotojas")]
		public int FK_KlientasID_Naudotojas { get; set; }
	}
}