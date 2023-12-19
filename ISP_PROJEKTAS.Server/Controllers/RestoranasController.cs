using ISP_PROJEKTAS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using WarehelperAPI.Data;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
namespace ISP_PROJEKTAS.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class RestoranasController : ControllerBase
	{
		private readonly MoltDbContext _context;
		public RestoranasController(MoltDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public ActionResult<IEnumerable<Restoranas>> Get()
		{
			
		
			IEnumerable<Restoranas> restoranai = _context.restoranas.Select(restoranas => new Restoranas
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
				//Nuotrauka = restoranas.Nuotrauka,
				Brangumas = restoranas.Brangumas,
				RestoranasID = restoranas.RestoranasID,

			});

			return Ok(restoranai);
		}
		[HttpGet("{id}")]
		public ActionResult<IEnumerable<Restoranas>> GetRestoranasById(int id)
		{
            Console.WriteLine(string.Format("GETDATE by id {0}", id));
            var restoranaiFromDb = _context.restoranas
				.Where(r => r.RestoranasID == id)
				.ToList();
			
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
				//Nuotrauka = restoranas.Nuotrauka,
				Brangumas = restoranas.Brangumas,
				RestoranasID = restoranas.RestoranasID,

			}).ToList();

			return Ok(restoranai[0]);
		}
        [HttpPost]
        public async Task<IActionResult> CreateRestaurant([FromBody] JObject data)
        {
			Console.WriteLine("IN POST RESTAURANT");
			Console.WriteLine(data);
			Restoranas restaurant = data["restoranas"].ToObject<Restoranas>();
		
			List<int> kategorijosId = JsonConvert.DeserializeObject<List<int>>(data["kategorijos"].ToString());
			for(int i = 0; i < kategorijosId.Count; i++)
			{
				kategorijosId[i]++;
			}
			//foreach (int k in kategorijosId)
			//{
			//	Console.WriteLine(k.ToString());
			//}

			
			if (restaurant == null)
			{
				return BadRequest("Invalid patiekalas data");
			}

			var newRestaurant = new Restoranas
			{
				Pavadinimas = restaurant.Pavadinimas,
				Miestas = restaurant.Miestas,
				Adresas = restaurant.Adresas,
				Saskaita = restaurant.Saskaita,
				UzsakymoMokestis = restaurant.UzsakymoMokestis,
				TelNumeris = restaurant.TelNumeris,
				AtidarymoLaikas = restaurant.UzdarymoLaikas,
				UzdarymoLaikas = restaurant.UzdarymoLaikas,
				MinimaliUzsakymoKaina = restaurant.MinimaliUzsakymoKaina,
				Brangumas = restaurant.Brangumas,
				IdValdytojas=restaurant.IdValdytojas,
				Aprasymas=restaurant.Aprasymas,
				Nuotrauka = restaurant.Nuotrauka

			};
			Console.WriteLine(string.Format("{0} {1} {2}", restaurant.Pavadinimas, restaurant.Brangumas, restaurant.IdValdytojas));

			//await _context.restorano_Kategorija.ForEachAsync((kat) => Console.WriteLine(kat.Id_Restorano_Kategorija));
			var categories = _context.restorano_Kategorija.Where((cat) => kategorijosId.Contains(cat.Id_Restorano_Kategorija) );
			
			
			await _context.restoranas.AddAsync(newRestaurant);
          
            await _context.SaveChangesAsync();
            foreach (var cat in categories)
            {
                await _context.kategorija.AddAsync(new Kategorija { kategorija = cat.Id_Restorano_Kategorija, Fk_Restoranasid_Restoranas = newRestaurant.RestoranasID });
            }
            await _context.SaveChangesAsync();
            return Ok(newRestaurant);
			
        }
        [HttpGet("{id}/kategorijos")]
        public ActionResult<IEnumerable<String>> GetRestaurantCategories(int id)
        {

            var categories = _context.kategorija
                .Where(r => r.Fk_Restoranasid_Restoranas == id)
                .ToList();

            List<String> names = new List<String>();
            foreach (var cat in categories)
            {
                var name = (_context.restorano_Kategorija.Find(cat.kategorija)).Pavadinimas;
                names.Add(name);

                Console.WriteLine(name);
            }


            return Ok(names);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestoranas(int id)
        {
			Console.WriteLine(id);
            var toDelete = await _context.restoranas.FindAsync(id);

            if (toDelete == null)
            {
                return NotFound();
            }
			List<Kategorija> kategorijos = _context.kategorija.Where((x) => x.Fk_Restoranasid_Restoranas == id).ToList();
			_context.kategorija.RemoveRange(kategorijos);
            await _context.SaveChangesAsync();
            _context.restoranas.Remove(toDelete);
            await _context.SaveChangesAsync();

            return Ok(toDelete);
        }
    }
}