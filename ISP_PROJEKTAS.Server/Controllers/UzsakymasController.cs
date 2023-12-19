using ISP_PROJEKTAS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using WarehelperAPI.Data;

namespace ISP_PROJEKTAS.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class UzsakymasController : ControllerBase
	{
		private readonly MoltDbContext _context;
		public UzsakymasController(MoltDbContext context)
		{
			_context = context;
		}

		[HttpGet(Name = "GetUzsakymas")]
		public ActionResult<IEnumerable<Uzsakymas>> Get()
		{
			var uzsakymaiFromDb = _context.uzsakymas.ToList();

			List<Uzsakymas> uzsakymai = uzsakymaiFromDb.Select(uzsakymas => new Uzsakymas
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
	}
}