import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CoreApiService } from '../core-api.service';
import { SnackerService } from '../snacker.service';
import { Ticket } from '../../models/app/ticket';
import { Factory } from '../../models/core/factory';

const ticketFactory = new Factory(Ticket);

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
    ) {}

    getTickets(raffleId: number) {
        this.loading = true;
        this.coreApi
            .getGenericArray<Ticket>('/api/ticket/getTickets', ticketFactory)
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
            .getGenericArray<Ticket>('/api/ticket/getIndexTickets', ticketFactory)
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
            .getGenericArray<Ticket>('/api/ticket/getWinningTickets', ticketFactory)
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

    addTicket(ticket: Ticket) {
        this.coreApi.post('/api/ticket/addTicket', JSON.stringify(ticket))
            .subscribe(
                () => {
                    this.getTickets(ticket.raffle.id);
                    this.snacker.sendSuccessMessage(`Ticket # ${ticket.ticketNumber} assigned to ${ticket.name}`);
                },
                err => this.snacker.sendErrorMessage(err)
            );
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

    addTicketIndex(raffleId: number, ticketNumber: number) {
        this.coreApi.post<Ticket>('/api/ticket/addTicketIndex/' + raffleId, JSON.stringify(ticketNumber))
            .subscribe(
                data => this.indexTickets.push(data),
                err => this.snacker.sendErrorMessage(err)
            );
    }

    removeTicketIndex(ticket: Ticket) {
        this.coreApi.post('/api/ticket/removeTicketIndex', JSON.stringify(ticket))
            .subscribe(
                () => {
                    this.getIndexTickets(ticket.raffle.id);
                    this.snacker.sendSuccessMessage(`Raffle items cleared for entries greater than ${ticket.index}`);
                },
                err => this.snacker.sendErrorMessage(err)
            );
    }
}
