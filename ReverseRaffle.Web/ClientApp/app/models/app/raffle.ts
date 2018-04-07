import { Ticket } from "./ticket";
import { Log } from "./log";

export class Raffle {
    id: number;
    title: string;
    eventDate: Date;
    isComplete: boolean;
    tickets: Ticket[];
    logs: Log[];

    constructor() {
        this.tickets = new Array<Ticket>();
        this.logs = new Array<Log>();
    }
}