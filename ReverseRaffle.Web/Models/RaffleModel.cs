using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReverseRaffle.Web.Models
{
    public class RaffleModel
    {
        public int id { get; set; }
        public string title { get; set; }
        public DateTime eventDate { get; set; }
        public bool isComplete { get; set; }
        public List<TicketModel> tickets { get; set; }
        public List<LogModel> logs { get; set; }
    }
}
