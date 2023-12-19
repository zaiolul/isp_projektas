using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
	public class Ingredientas
	{
		[Column("pavadinimas")]
		public string pavadinimas { get; set; }
		[Key]
		[Column("id_Ingredientas")]
		public int Id_Ingredientas { get; set; }


		[Column("fk_Patiekalasid_Patiekalas")]
		public int Fk_Patiekalasid { get; set; }


	}
}