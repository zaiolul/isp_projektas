using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
	public class Krepselis
	{
		[Key]
		[Column("id_Krepselis")]
		public int KrepselisID { get; set; }

		[Column("fk_Uzsakymasid_Uzsakymas")]
		public int FKUzsakymasID { get; set; }
	}
}