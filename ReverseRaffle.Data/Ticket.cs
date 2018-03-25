using System.Collections.Generic;

namespace ReverseRaffle.Data
{
    public class Ticket
    {
        public int Id { get; set; }
        public int RaffleId { get; set; }
        public int Index { get; set; }
        public int TicketNumber { get; set; }
        public string Name { get; set; }
        public Raffle Raffle { get; set; }
    }
}
