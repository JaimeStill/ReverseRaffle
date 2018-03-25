import { Raffle } from './raffle';
export class Ticket {
    id: number;
    index: number;
    ticketNumber: number;
    name: string;
    raffle: Raffle;
}