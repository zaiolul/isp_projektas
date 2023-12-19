using ISP_PROJEKTAS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using WarehelperAPI.Data;

namespace ISP_PROJEKTAS.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NaudotojasController : ControllerBase
    {
        private readonly MoltDbContext _context;
        public NaudotojasController(MoltDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetUzsakymai/{klientasID}", Name = "GetUzsakymai")]
        public ActionResult<IEnumerable<Uzsakymas>> GetUzsakymai(int klientasID)
        {
            var uzsakymaiget = _context.uzsakymas.Where(u => u.FK_KlientasID_Naudotojas == klientasID).ToList();

            List<Uzsakymas> uzsakymai = uzsakymaiget.Select(uzsakymas => new Uzsakymas
            {
                Data = uzsakymas.Data,
                Sumoketa = uzsakymas.Sumoketa,
                PilnaKaina = uzsakymas.PilnaKaina,
                ApmokejimoBudas = uzsakymas.ApmokejimoBudas,
                UzsakymasID = uzsakymas.UzsakymasID,
                FK_KlientasID_Naudotojas = uzsakymas.FK_KlientasID_Naudotojas,
            }).ToList();

            return Ok(uzsakymai);
        }
        [HttpGet("GetUserData/{klientasID}", Name = "GetUserData")]
        public ActionResult<IEnumerable<Uzsakymas>> GetUserData(int klientasID)
        {
            System.Diagnostics.Debug.WriteLine("why");
            var naudotojasget = _context.naudotojas.FirstOrDefault(u => u.NaudotojasID == klientasID);
            

            if (naudotojasget != null)
            {
                var naudotojoData = new Naudotojas
                {
                    NaudotojasID = naudotojasget.NaudotojasID,
                    Vardas = naudotojasget.Vardas,
                    Pavarde = naudotojasget.Pavarde,
                    GimimoData = naudotojasget.GimimoData,
                    Slaptazodis = naudotojasget.Slaptazodis,
                    ElPastas = naudotojasget.ElPastas,
                    Slapyvardis = naudotojasget.Slapyvardis,
                    Miestas = naudotojasget.Miestas,
                    RegistravimoData = naudotojasget.RegistravimoData,
                    TelNumeris = naudotojasget.TelNumeris,
                };

                return Ok(naudotojoData);
            }
            return null;
        }

    }
}
