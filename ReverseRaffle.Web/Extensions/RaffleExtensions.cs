using Microsoft.EntityFrameworkCore;
using ReverseRaffle.Data;
using ReverseRaffle.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReverseRaffle.Web.Extensions
{
    public static class RaffleExtensions
    {
        public static RaffleModel CastToRaffle(this Raffle raffle)
        {
            var model = new RaffleModel
            {
                id = raffle.Id,
                eventDate = raffle.EventDate,
                isComplete = raffle.IsComplete,
                title = raffle.Title
            };

            return model;
        }

        public static IQueryable<RaffleModel> SelectRaffles(this IQueryable<Raffle> raffles)
        {
            return raffles.Select(x => x.CastToRaffle());
        }

        public static async Task<List<RaffleModel>> GetRaffles(this AppDbContext db)
        {
            var raffles = await db.Raffles.Where(x => !x.IsComplete).SelectRaffles().ToListAsync();
            return raffles;
        }

        public static async Task<List<RaffleModel>> GetCompletedRaffles(this AppDbContext db)
        {
            var raffles = await db.Raffles.Where(x => x.IsComplete).SelectRaffles().ToListAsync();
            return raffles;
        }

        public static async Task<RaffleModel> GetRaffle(this AppDbContext db, int id)
        {
            var raffle = await db.Raffles.FirstOrDefaultAsync(x => x.Id == id);
            return raffle.CastToRaffle();
        }

        public static async Task<bool> CheckRaffleComplete(this AppDbContext db, int id)
        {
            var tickets = await db.Tickets.Where(x => x.RaffleId == id).ToListAsync();
            return tickets.Select(x => x.Index).Contains(0) ? false : true;
        }

        public static async Task<int> AddRaffle(this AppDbContext db, RaffleModel model)
        {
            if (model.Validate())
            {
                var raffle = new Raffle
                {
                    EventDate = model.eventDate,
                    IsComplete = false,
                    Title = model.title
                };

                await db.Raffles.AddAsync(raffle);
                await db.SaveChangesAsync();
                return raffle.Id;
            }

            return 0;
        }

        public static async Task UpdateRaffle(this AppDbContext db, RaffleModel model)
        {
            if (model.Validate())
            {
                var raffle = await db.Raffles.FindAsync(model.id);
                raffle.Title = model.title;
                raffle.EventDate = model.eventDate;
                await db.SaveChangesAsync();
            }
        }

        public static async Task DeleteRaffle(this AppDbContext db, int id)
        {
            var raffle = await db.Raffles.FindAsync(id);
            db.Raffles.Remove(raffle);
            await db.SaveChangesAsync();
        }

        public static async Task ToggleRaffleComplete(this AppDbContext db, int id)
        {
            var raffle = await db.Raffles.FindAsync(id);
            raffle.IsComplete = !raffle.IsComplete;
            await db.SaveChangesAsync();
        }

        public static bool Validate(this RaffleModel model)
        {
            if (model.eventDate == DateTime.MinValue)
            {
                throw new Exception("Raffle must specify an event date");
            }

            if (string.IsNullOrEmpty(model.title))
            {
                throw new Exception("Raffle must have a title");
            }

            return true;
        }
    }
}
