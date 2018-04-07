using Microsoft.EntityFrameworkCore;
using ReverseRaffle.Data;
using ReverseRaffle.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReverseRaffle.Web.Extensions
{
    public static class LogExtensions
    {
        public static LogModel CastToLog(this Log log)
        {
            var model = new LogModel
            {
                id = log.Id,
                input = log.Input,
                raffle = new RaffleModel { id = log.RaffleId }
            };

            return model;
        }

        public static IQueryable<LogModel> SelectLogs(this IQueryable<Log> logs)
        {
            return logs.Select(x => x.CastToLog());
        }

        public static async Task<List<LogModel>> GetLogs(this AppDbContext db, int raffleId)
        {
            var logs = await db.Logs
                .Where(x => x.RaffleId == raffleId)
                .SelectLogs()
                .OrderByDescending(x => x.id)
                .ToListAsync();

            return logs;
        }

        public static async Task AddLog(this AppDbContext db, int raffleId, string input)
        {
            var log = new Log
            {
                Input = input,
                RaffleId = raffleId
            };

            await db.Logs.AddAsync(log);
            await db.SaveChangesAsync();
        }

        public static async Task RemoveLog(this AppDbContext db, int id)
        {
            var log = await db.Logs.FindAsync(id);
            db.Logs.Remove(log);
            await db.SaveChangesAsync();
        }
    }
}
