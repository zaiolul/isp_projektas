using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
	public class Ingredientai
	{
		[Key]
		[Column("id_ingredientas")]
		public int Id_Ingredientas { get; set; }
		[Column("pavadinimas")]
		public string pavadinimas { get; set; }

	}
}