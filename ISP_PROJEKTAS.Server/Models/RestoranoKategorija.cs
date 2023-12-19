using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
    public class RestoranoKategorija
    {
        [Key]
        public int Id_Restorano_Kategorija { get; set; }

        [Column("pavadinimas")]
        public string Pavadinimas { get; set; }
    }
}
