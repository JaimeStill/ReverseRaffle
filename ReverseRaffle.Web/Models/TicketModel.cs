using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReverseRaffle.Web.Models
{
    public class TicketModel
    {
        public int id { get; set; }
        public int index { get; set; }
        public int ticketNumber { get; set; }
        public string name { get; set; }
        public RaffleModel raffle { get; set; }
    }
}
