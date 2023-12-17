using ISP_PROJEKTAS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using WarehelperAPI.Data;

namespace ISP_PROJEKTAS.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class KrepselisController : ControllerBase
	{
		private readonly MoltDbContext _context;
		public KrepselisController(MoltDbContext context)
		{
			_context = context;
		}

		[HttpGet(Name = "GetKrepselis")]
		public ActionResult<IEnumerable<Krepselis>> Get()
		{
			var krepseliaiFromDb = _context.krepselis.ToList();
            Console.WriteLine("test");

            List<Krepselis> krepseliai = krepseliaiFromDb.Select(krepselis => new Krepselis
			{
				KrepselisID = krepselis.KrepselisID,
				FKUzsakymasID = krepselis.FKUzsakymasID,

			}).ToList();

			return Ok(krepseliai);
		}
	}
}