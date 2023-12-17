using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
	public class Naudotojas
	{
		[Key]
		[Column("id_Naudotojas")]
		public int NaudotojasID { get; set; }

		[Column("vardas")]
		public string Vardas { get; set; }

		[Column("pavarde")]
		public string Pavarde { get; set; }

		[Column("gimimo_data")]
		public DateTime GimimoData { get; set; }

		[Column("slaptazodis")]
		public string Slaptazodis { get; set; }

		[Column("el_pastas")]
		public string ElPastas { get; set; }

		[Column("slapyvardis")]
		public string Slapyvardis { get; set; }

		[Column("miestas")]
		public string Miestas { get; set; }

		[Column("registravimo_data")]
		public DateTime RegistravimoData { get; set; }

		[Column("tel_numeris")]
		public string TelNumeris { get; set; }
	}
}