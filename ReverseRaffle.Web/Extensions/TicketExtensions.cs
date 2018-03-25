using Microsoft.EntityFrameworkCore;
using ReverseRaffle.Data;
using ReverseRaffle.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReverseRaffle.Web.Extensions
{
    public static class TicketExtensions
    {
        public static TicketModel CastToTicket(this Ticket ticket)
        {
            var model = new TicketModel
            {
                id = ticket.Id,
                index = ticket.Index,
                name = ticket.Name,
                raffle = new RaffleModel { id = ticket.RaffleId },
                ticketNumber = ticket.TicketNumber                
            };

            return model;
        }

        public static IQueryable<TicketModel> SelectTickets(this DbSet<Ticket> tickets, int raffleId)
        {
            return tickets.Where(x => x.RaffleId == raffleId).Select(x => x.CastToTicket()).OrderBy(x => x.ticketNumber);
        }

        public static IQueryable<TicketModel> SelectIndexTickets(this DbSet<Ticket> tickets, int raffleId)
        {
            return tickets.Where(x => x.Index > 0 && x.RaffleId == raffleId).Select(x => x.CastToTicket()).OrderBy(x => x.index);
        }

        public static async Task<List<TicketModel>> GetTickets(this AppDbContext db, int raffleId)
        {
            var tickets = await db.Tickets.SelectTickets(raffleId).ToListAsync();
            return tickets;
        }

        public static async Task<List<TicketModel>> GetIndexTickets(this AppDbContext db, int raffleId)
        {
            var tickets = await db.Tickets.SelectIndexTickets(raffleId).ToListAsync();
            return tickets;
        }

        public static async Task<List<TicketModel>> GetWinningTickets(this AppDbContext db, int raffleId)
        {
            var tickets = await db.Tickets.Where(x => x.RaffleId == raffleId).Select(x => x.CastToTicket()).OrderByDescending(x => x.index).Take(5).ToListAsync();
            return tickets;
        }

        public static async Task<TicketModel> FindTicketByNumber(this AppDbContext db, int raffleId, int ticketNumber)
        {
            var model = await db.Tickets.FirstOrDefaultAsync(x => x.RaffleId == raffleId && x.TicketNumber == ticketNumber);
            return model.CastToTicket();
        }

        public static async Task AddTicket(this AppDbContext db, TicketModel model)
        {
            if (await model.Validate(db))
            {
                var ticket = new Ticket
                {
                    Index = 0,
                    Name = model.name,
                    RaffleId = model.raffle.id,
                    TicketNumber = model.ticketNumber
                };

                await db.Tickets.AddAsync(ticket);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateTicket(this AppDbContext db, TicketModel model)
        {
            if (await model.Validate(db))
            {
                var ticket = await db.Tickets.FindAsync(model.id);
                ticket.Name = model.name;
                ticket.TicketNumber = model.ticketNumber;
                await db.SaveChangesAsync();
            }
        }

        public static async Task DeleteTicket(this AppDbContext db, int id)
        {
            var ticket = await db.Tickets.FindAsync(id);
            db.Tickets.Remove(ticket);
            await db.SaveChangesAsync();
        }

        public static async Task<TicketModel> AddTicketIndex(this AppDbContext db, TicketModel model)
        {
            var ticket = await db.Tickets.FindAsync(model.id);
            var index = db.Tickets.Max(x => x.Index);
            ticket.Index = index + 1;
            await db.SaveChangesAsync();
            return ticket.CastToTicket();
        }

        public static async Task RemoveTicketIndex(this AppDbContext db, TicketModel model)
        {
            var ticket = await db.Tickets.FindAsync(model.id);
            var tickets = db.Tickets.Where(x => x.Index > ticket.Index).ToList();

            if (tickets.Count > 0)
            {
                foreach (var t in tickets)
                {
                    t.Index = 0;
                }
            }

            ticket.Index = 0;
            await db.SaveChangesAsync();
        }

        public static async Task<bool> Validate(this TicketModel model, AppDbContext db)
        {
            if (model.ticketNumber > 250 || model.ticketNumber < 1)
            {
                throw new Exception("Ticket number may only be 1 - 250");
            }

            if (string.IsNullOrEmpty(model.name))
            {
                throw new Exception("Ticket must have a name");
            }

            if (!(model.raffle?.id > 0))
            {
                throw new Exception("Ticket must be linked to a raffle event");
            }
            
            if (model.id > 0)
            {
                var check = await db.Tickets.FirstOrDefaultAsync(x => x.Id != model.id && x.TicketNumber == model.ticketNumber);

                if (check != null)
                {
                    throw new Exception("The provided ticket number has already been issued");
                }
            }
            else
            {
                var check = await db.Tickets.FirstOrDefaultAsync(x => x.TicketNumber == model.ticketNumber);

                if (check != null)
                {
                    throw new Exception("The provided ticket number has already been issued");
                }
            }

            return true;
        }
    }
}
