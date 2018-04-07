using Microsoft.AspNetCore.Mvc;
using ReverseRaffle.Data;
using ReverseRaffle.Web.Extensions;
using ReverseRaffle.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReverseRaffle.Web.Controllers
{
    [Route("api/[controller]")]
    public class TicketController : Controller
    {
        private AppDbContext db;

        public TicketController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]/{id}")]
        public async Task<List<TicketModel>> GetTickets([FromRoute]int id)
        {
            return await db.GetTickets(id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<List<TicketModel>> GetIndexTickets([FromRoute]int id)
        {
            return await db.GetIndexTickets(id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<List<TicketModel>> GetWinningTickets([FromRoute]int id)
        {
            return await db.GetWinningTickets(id);
        }

        [HttpPost("[action]")]
        public async Task AddTicket([FromBody]TicketModel model)
        {
            await db.AddTicket(model);
        }

        [HttpPost("[action]")]
        public async Task UpdateTicket([FromBody]TicketModel model)
        {
            await db.UpdateTicket(model);
        }

        [HttpPost("[action]")]
        public async Task DeleteTicket([FromBody]int id)
        {
            await db.DeleteTicket(id);
        }

        [HttpPost("[action]/{raffleId}")]
        public async Task<TicketModel> AddTicketIndex([FromRoute]int raffleId, [FromBody]int ticketNumber)
        {
            var ticket = await db.FindTicketByNumber(raffleId, ticketNumber);
            return await db.AddTicketIndex(ticket);
        }

        [HttpPost("[action]")]
        public async Task RemoveTicketIndex([FromBody]TicketModel model) => await db.RemoveTicketIndex(model);
    }
}
