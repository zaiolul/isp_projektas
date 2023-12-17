using ISP_PROJEKTAS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using WarehelperAPI.Data;

namespace ISP_PROJEKTAS.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class RestoranasController : ControllerBase
	{
		private readonly MoltDbContext _context;
		public RestoranasController(MoltDbContext context)
		{
			_context = context;
		}

		[HttpGet(Name = "GetRestoranas")]
		public ActionResult<IEnumerable<Restoranas>> Get()
		{
			var restoranaiFromDb = _context.restoranas.ToList();

			List<Restoranas> restoranai = restoranaiFromDb.Select(restoranas => new Restoranas
			{
				Pavadinimas = restoranas.Pavadinimas,
				Miestas = restoranas.Miestas,
				Adresas = restoranas.Adresas,
				Saskaita = restoranas.Saskaita,
				UzsakymoMokestis = restoranas.UzsakymoMokestis,
				Aprasymas = restoranas.Aprasymas,
				TelNumeris = restoranas.TelNumeris,
				AtidarymoLaikas = restoranas.AtidarymoLaikas,
				UzdarymoLaikas = restoranas.UzdarymoLaikas,
				MinimaliUzsakymoKaina = restoranas.MinimaliUzsakymoKaina,
				Nuotrauka = restoranas.Nuotrauka,
				Brangumas = restoranas.Brangumas,
				RestoranasID = restoranas.RestoranasID,

			}).ToList();

			return Ok(restoranai);
		}
	}
}