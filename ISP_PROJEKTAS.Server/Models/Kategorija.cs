using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ISP_PROJEKTAS.Server.Models
{
    public class Kategorija
    {
        [Column("kategorija")]
        public int kategorija { get; set; }
        [Key]
        [Column("id_kategorija")]
        public int Id_Kategorija { get; set; }

    
        [Column("fk_Restoranasid_Restoranas")]
        public int Fk_Restoranasid_Restoranas { get; set; }

        
    }
}