using Microsoft.AspNetCore.Mvc;
using ReverseRaffle.Data;
using ReverseRaffle.Web.Extensions;
using ReverseRaffle.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReverseRaffle.Web.Controllers
{
    [Route("api/[Controller]")]
    public class RaffleController : Controller
    {
        private AppDbContext db;

        public RaffleController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<RaffleModel>> GetRaffles()
        {
            return await db.GetRaffles();
        }

        [HttpGet("[action]")]
        public async Task<List<RaffleModel>> GetCompletedRaffles()
        {
            return await db.GetCompletedRaffles();
        }

        [HttpGet("[action]/{id}")]
        public async Task<RaffleModel> GetRaffle([FromRoute]int id)
        {
            return await db.GetRaffle(id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<bool> CheckRaffleComplete([FromRoute]int id)
        {
            return await db.CheckRaffleComplete(id);
        }

        [HttpPost("[action]")]
        public async Task<int> AddRaffle([FromBody]RaffleModel model)
        {
            return await db.AddRaffle(model);
        }

        [HttpPost("[action]")]
        public async Task UpdateRaffle([FromBody]RaffleModel model)
        {
            await db.UpdateRaffle(model);
        }

        [HttpPost("[action]")]
        public async Task DeleteRaffle([FromBody]int id)
        {
            await db.DeleteRaffle(id);
        }

        [HttpPost("[action]")]
        public async Task ToggleRaffleComplete([FromBody] int id) => await db.ToggleRaffleComplete(id);
    }
}
