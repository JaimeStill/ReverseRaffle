using System;
using System.Collections.Generic;

namespace ReverseRaffle.Data
{
    public class Raffle
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime EventDate { get; set; }
        public bool IsComplete { get; set; }
        public List<Ticket> Tickets { get; set; }
        public List<Log> Logs { get; set; }
    }
}
