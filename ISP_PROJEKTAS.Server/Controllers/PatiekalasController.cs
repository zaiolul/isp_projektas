using ISP_PROJEKTAS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using WarehelperAPI.Data;

namespace ISP_PROJEKTAS.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class PatiekalasController : ControllerBase
	{
		private readonly MoltDbContext _context;
		public PatiekalasController(MoltDbContext context)
		{
			_context = context;
		}

		[HttpGet(Name = "GetPatiekalas")]
		public ActionResult<IEnumerable<Patiekalas>> Get(/*int? restaurantId = 1*/)
		{

			var patiekalaiFromDb = _context.patiekalas
				//.Where(p => p.FKRestoranasID == 1)
				.ToList();
			Console.WriteLine("aaaaa");
			List<Patiekalas> patiekalai = patiekalaiFromDb.Select(patiekalasFromDb => new Patiekalas
			{
				Pavadinimas = patiekalasFromDb.Pavadinimas,
				Kaina = patiekalasFromDb.Kaina,
				MeniuKategorija = patiekalasFromDb.MeniuKategorija,
				Kalorijos = patiekalasFromDb.Kalorijos,
				Aprasymas = patiekalasFromDb.Aprasymas,
				TinkaVeganams = patiekalasFromDb.TinkaVeganams,
				Astrumas = patiekalasFromDb.Astrumas,
				PatiekalasID = patiekalasFromDb.PatiekalasID,
				FKRestoranasID = patiekalasFromDb.FKRestoranasID
			}).ToList();
			return Ok(patiekalai);
		}
	}
}