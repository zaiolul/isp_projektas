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

		[HttpGet("ByKlientasID/{klientasID}", Name = "GetUzsakymasByKlientasID")]
		public ActionResult<IEnumerable<Uzsakymas>> GetByKlientasID(int klientasID)
		{
			var uzsakymaiFromDb = _context.uzsakymas.Where(u => u.FK_KlientasID_Naudotojas == klientasID).ToList();

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

		[HttpGet("byUzsakymasID/{uzsakymasID}")]
		public ActionResult<IEnumerable<Uzsakymas>> GetKrepselioPrekeByUzsakymasID(int uzsakymasID)
		{
			Console.WriteLine("GetKrepselioPrekeByUzsakymasID 1");
			var krepselioPrekesFromDb = _context.krepselio_Preke.Where(p => p.FKUzsakymasID == uzsakymasID)
				.ToList().ToList();

			Console.WriteLine("GetKrepselioPrekeByUzsakymasID 2");

			List<KrepselioPreke> krepselioPrekes = krepselioPrekesFromDb
				.Select(krepselioPreke =>
				{
					
					var krepselioPrekeDto = new KrepselioPreke
					{
						Kiekis = krepselioPreke.Kiekis,
						KrepselioPrekeID = krepselioPreke.KrepselioPrekeID,
						FKPatiekalasID = krepselioPreke.FKPatiekalasID,
						FKUzsakymasID = krepselioPreke.FKUzsakymasID,
					};

					
					var patiekalas = _context.patiekalas.Find(krepselioPreke.FKPatiekalasID);
					krepselioPrekeDto.PatiekalasPavadinimas = patiekalas?.Pavadinimas;

					

					krepselioPrekeDto.PatiekalasKaina = patiekalas?.Kaina ?? 0.0f;

					
					var restoranas = _context.restoranas.Find(patiekalas?.FKRestoranasID);
					krepselioPrekeDto.RestoranasPavadinimas = restoranas?.Pavadinimas;

					return krepselioPrekeDto;
				}).ToList();

			return Ok(krepselioPrekes);
		}





		[HttpDelete("{krepselioPrekeID}")]
		public ActionResult DeleteKrepselioPreke(int krepselioPrekeID)
		{
			try
			{
				
				var krepselioPrekeToDelete = _context.krepselio_Preke.Find(krepselioPrekeID);

				
				if (krepselioPrekeToDelete == null)
				{
					return NotFound($"KrepselioPreke with ID {krepselioPrekeID} not found");
				}

				
				_context.krepselio_Preke.Remove(krepselioPrekeToDelete);
				_context.SaveChanges();

				return NoContent();
			}
			catch (Exception ex)
			{
				
				return StatusCode(500, $"Error deleting KrepselioPreke: {ex.Message}");
			}
		}



		[HttpPut("KeistiKieki/{krepselioPrekeID}")]
		public ActionResult KeistiKieki(int krepselioPrekeID, [FromBody] UpdateKiekisRequest request)
		{
			try
			{
				var krepselioPrekeToUpdate = _context.krepselio_Preke.Find(krepselioPrekeID);

				if (krepselioPrekeToUpdate == null)
				{
					return NotFound($"KrepselioPreke with ID {krepselioPrekeID} not found");
				}

				krepselioPrekeToUpdate.Kiekis = request.Kiekis;
				_context.SaveChanges();

				return NoContent(); // 204 No Content
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error updating Kiekis: {ex.Message}");
			}
		}

		public class UpdateKiekisRequest
		{
			public int Kiekis { get; set; }
		}

		[HttpPost("AddKrepselioPreke")]
		public ActionResult AddKrepselioPreke([FromBody] KrepselioPrekeRequest request)
		{
			try
			{
				
				if (request == null)
				{
					return BadRequest("Invalid request data");
				}

				
				var newKrepselioPreke = new KrepselioPreke
				{
					Kiekis = request.Kiekis,
					FKPatiekalasID = request.FKPatiekalasID,
					FKUzsakymasID = request.FKUzsakymasID,
				};

				
				_context.krepselio_Preke.Add(newKrepselioPreke);
				_context.SaveChanges();

				return CreatedAtAction("GetKrepselioPrekeByUzsakymasID", new { uzsakymasID = request.FKUzsakymasID }, newKrepselioPreke);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error creating KrepselioPreke: {ex.Message}");
			}
		}

		public class KrepselioPrekeRequest
		{
			public int Kiekis { get; set; }
			public int FKPatiekalasID { get; set; }
			public int FKUzsakymasID { get; set; }
		}



	}
}