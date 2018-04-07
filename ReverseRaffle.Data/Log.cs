using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReverseRaffle.Data
{
    public class Log
    {
        public int Id { get; set; }
        public int RaffleId { get; set; }
        public string Input { get; set; }
        public Raffle Raffle { get; set; }
    }
}
