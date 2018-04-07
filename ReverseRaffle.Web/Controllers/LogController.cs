using Microsoft.AspNetCore.Mvc;
using ReverseRaffle.Data;
using ReverseRaffle.Web.Extensions;
using ReverseRaffle.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReverseRaffle.Web.Controllers
{
    [Route("api/[controller]")]
    public class LogController : Controller
    {
        private AppDbContext db;

        public LogController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]/{raffleId}")]
        public async Task<List<LogModel>> GetLogs([FromRoute]int raffleId) => await db.GetLogs(raffleId);

        [HttpPost("[action]")]
        public async Task RemoveLog([FromBody]int id) => await db.RemoveLog(id);
    }
}
