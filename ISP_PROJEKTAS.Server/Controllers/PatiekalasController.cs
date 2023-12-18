using ISP_PROJEKTAS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehelperAPI.Data;

namespace ISP_PROJEKTAS.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class PatiekalasController : ControllerBase
	{
		private readonly MoltDbContext _context;
		public PatiekalasController(MoltDbContext context)
		{
			_context = context;
		}

		[HttpGet("{patiekalasId}")]
		public ActionResult<Patiekalas> GetPatiekalasById(int patiekalasId)
		{
			var patiekalasFromDb = _context.patiekalas
				.FirstOrDefault(p => p.PatiekalasID == patiekalasId);

			if (patiekalasFromDb == null)
			{
				return NotFound();
			}

			return Ok(patiekalasFromDb);
		}
		[HttpGet("byRestoranas/{restoranasId}")]
		public ActionResult<IEnumerable<Patiekalas>> GetPatiekalasByRestoranasId(int restoranasId)
		{
			var patiekalaiFromDb = _context.patiekalas
				.Where(p => p.FKRestoranasID == restoranasId)
				.ToList();

			return Ok(patiekalaiFromDb);
		}
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdatePatiekalas(int id, Patiekalas updatedPatiekalas)
		{
			if (id != updatedPatiekalas.PatiekalasID)
			{
				return BadRequest();
			}

			_context.Entry(updatedPatiekalas).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!PatiekalasExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}
		[HttpPost]
		public async Task<IActionResult> CreatePatiekalas([FromBody] Patiekalas patiekalasViewModel)
		{
			Console.WriteLine($"Received data:", patiekalasViewModel.Aprasymas);
			if (patiekalasViewModel == null)
			{
				return BadRequest("Invalid patiekalas data");
			}

			var newPatiekalas = new Patiekalas
			{
				Pavadinimas = patiekalasViewModel.Pavadinimas,
				Kaina = patiekalasViewModel.Kaina,
				MeniuKategorija = patiekalasViewModel.MeniuKategorija,
				Kalorijos = patiekalasViewModel.Kalorijos,
				Aprasymas = patiekalasViewModel.Aprasymas,
				TinkaVeganams = patiekalasViewModel.TinkaVeganams,
				Astrumas = patiekalasViewModel.Astrumas,
				FKRestoranasID = patiekalasViewModel.FKRestoranasID
			};

			_context.patiekalas.Add(newPatiekalas);
			await _context.SaveChangesAsync();

			return Ok(newPatiekalas);
		}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeletePatiekalas(int id)
		{
			var patiekalasToDelete = await _context.patiekalas.FindAsync(id);

			if (patiekalasToDelete == null)
			{
				return NotFound();
			}

			_context.patiekalas.Remove(patiekalasToDelete);
			await _context.SaveChangesAsync();

			return Ok(patiekalasToDelete);
		}
		private bool PatiekalasExists(int id)
		{
			return _context.patiekalas.Any(e => e.PatiekalasID == id);
		}
	}
}