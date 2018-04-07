using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReverseRaffle.Web.Models
{
    public class LogModel
    {
        public int id { get; set; }
        public string input { get; set; }
        public RaffleModel raffle { get; set; }
    }
}
