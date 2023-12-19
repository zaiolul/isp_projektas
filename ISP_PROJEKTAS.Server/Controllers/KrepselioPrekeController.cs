using ISP_PROJEKTAS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using WarehelperAPI.Data;

namespace ISP_PROJEKTAS.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class KrepselioPrekeController : ControllerBase
	{
		private readonly MoltDbContext _context;
		public KrepselioPrekeController(MoltDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public ActionResult<IEnumerable<KrepselioPreke>> Get()
		{
			var krepselioPrekesFromDb = _context.krepselio_Preke.ToList();
			Console.WriteLine("test krepselio preke");

			List<KrepselioPreke> krepselioPrekes = krepselioPrekesFromDb.Select(krepselioPreke => new KrepselioPreke
			{
				Kiekis = krepselioPreke.Kiekis,
				KrepselioPrekeID = krepselioPreke.KrepselioPrekeID,
				FKPatiekalasID = krepselioPreke.FKPatiekalasID,
				FKUzsakymasID = krepselioPreke.FKUzsakymasID,
			}).ToList();

			return Ok(krepselioPrekes);
		}
	}
}