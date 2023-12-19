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
            System.Diagnostics.Debug.WriteLine("get user data");
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
                naudotojasget = null;
                return Ok(naudotojoData);
            }
            return null;
        }

        [HttpPut("UpdateUserData/{klientasID}", Name = "UpdateUserData")]
        public ActionResult UpdateUserData(int klientasID, [FromBody] Naudotojas updatedUserData)
        {
            System.Diagnostics.Debug.WriteLine("update user data");
            var naudotojasToUpdate = _context.naudotojas.FirstOrDefault(u => u.NaudotojasID == klientasID);

            if (naudotojasToUpdate != null)
            {
                naudotojasToUpdate.Vardas = updatedUserData.Vardas;
                naudotojasToUpdate.Pavarde = updatedUserData.Pavarde;
                naudotojasToUpdate.GimimoData = updatedUserData.GimimoData;
                naudotojasToUpdate.Slaptazodis = updatedUserData.Slaptazodis;
                naudotojasToUpdate.ElPastas = updatedUserData.ElPastas;
                naudotojasToUpdate.Slapyvardis = updatedUserData.Slapyvardis;
                naudotojasToUpdate.Miestas = updatedUserData.Miestas;
                naudotojasToUpdate.RegistravimoData = updatedUserData.RegistravimoData;
                naudotojasToUpdate.TelNumeris = updatedUserData.TelNumeris;

                _context.SaveChanges();

                return Ok("User data updated successfully");
            }

            return NotFound("User not found");
        }

    }
}
