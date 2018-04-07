import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CoreApiService } from '../core-api.service';
import { SnackerService } from '../snacker.service';
import { Ticket } from '../../models/app/ticket';
import { Factory } from '../../models/core/factory';
import { Raffle } from '../../models/app/raffle';

const ticketFactory = new Factory(Ticket);

const testFirstNames = [
    "James",
    "John",
    "Robert",
    "Michael",
    "William",
    "David",
    "Richard",
    "Joseph",
    "Thomas",
    "Charles",
    "Mary",
    "Patricia",
    "Jennifer",
    "Elizabeth",
    "Linda",
    "Barbara",
    "Susan",
    "Jessica",
    "Margaret",
    "Sarah"
];

const testLastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor"
];

@Injectable()
export class TicketService {
    tickets = new BehaviorSubject<Ticket[]>([]);
    indexTickets = new Array<Ticket>();
    winningTickets = new BehaviorSubject<Ticket[]>([]);

    loading = false;
    loadingIndex = false;
    loadingWinning = false;

    constructor(
        public coreApi: CoreApiService,
        public snacker: SnackerService
    ) { }

    getTickets(raffleId: number) {
        this.loading = true;
        this.coreApi
            .getGenericArray<Ticket>('/api/ticket/getTickets/' + raffleId, ticketFactory)
            .subscribe(
            data => {
                this.loading = false;
                this.tickets.next(data);
            },
            err => {
                this.loading = false;
                this.snacker.sendErrorMessage(err);
            }
            );
    }

    getIndexTickets(raffleId: number) {
        this.loadingIndex = true;
        this.coreApi
            .getGenericArray<Ticket>('/api/ticket/getIndexTickets/' + raffleId, ticketFactory)
            .subscribe(
            data => {
                this.loadingIndex = false;
                this.indexTickets = data;
            },
            err => {
                this.loadingIndex = false;
                this.snacker.sendErrorMessage(err);
            }
            );
    }

    getWinningTickets(raffleId: number) {
        this.loadingWinning = true;
        this.coreApi
            .getGenericArray<Ticket>('/api/ticket/getWinningTickets/' + raffleId, ticketFactory)
            .subscribe(
            data => {
                this.loadingWinning = false;
                this.winningTickets.next(data);
            },
            err => {
                this.loadingIndex = false;
                this.snacker.sendErrorMessage(err);
            }
            );
    }

    addTicket(ticket: Ticket): Observable<{}> {
        return this.coreApi.post('/api/ticket/addTicket', JSON.stringify(ticket));
    }

    updateTicket(ticket: Ticket) {
        this.coreApi.post('/api/ticket/updateTicket', JSON.stringify(ticket))
            .subscribe(
            () => {
                this.getTickets(ticket.raffle.id);
                this.snacker.sendSuccessMessage(`Ticket # ${ticket.ticketNumber} assigned to ${ticket.name}`);
            },
            err => this.snacker.sendErrorMessage(err)
            );
    }

    deleteTicket(ticket: Ticket) {
        this.coreApi.post('/api/ticket/deleteTicket', JSON.stringify(ticket.id))
            .subscribe(
            () => {
                this.getTickets(ticket.raffle.id);
                this.snacker.sendSuccessMessage(`Ticket # ${ticket.ticketNumber} successfully deleted`);
            },
            err => this.snacker.sendErrorMessage(err)
            );
    }

    addTicketIndex(raffleId: number, ticketNumber: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.coreApi.post<Ticket>('/api/ticket/addTicketIndex/' + raffleId, JSON.stringify(ticketNumber))
                .subscribe(
                data => {
                    this.indexTickets.unshift(data);
                    resolve(true);
                },
                err => {
                    this.snacker.sendErrorMessage(err);
                    reject(err);
                });
        });
    }

    removeTicketIndex(ticket: Ticket): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.coreApi.post('/api/ticket/removeTicketIndex', JSON.stringify(ticket))
                .subscribe(
                () => {                    
                    this.getIndexTickets(ticket.raffle.id);
                    this.snacker.sendSuccessMessage(`Raffle items cleared for entries greater than ${ticket.index}`);
                    resolve(true);
                },
                err => {
                    this.snacker.sendErrorMessage(err);
                    reject(err);
                });
        });
    }

    generateRandomTickets(raffleId: number) {
        for (let i = 1; i < 251; i++) {
            let ticket = new Ticket();
            ticket.ticketNumber = i;
            ticket.name = `${testFirstNames[Math.floor(Math.random() * 20)]} ${testLastNames[Math.floor(Math.random() * 10)]}`;
            ticket.raffle = new Raffle();
            ticket.raffle.id = raffleId;
            this.addTicket(ticket).subscribe(
                () => this.snacker.sendSuccessMessage(`${ticket.ticketNumber} added`),
                err => this.snacker.sendErrorMessage(err)
            );
        }

        this.getTickets(raffleId);
    }
}
