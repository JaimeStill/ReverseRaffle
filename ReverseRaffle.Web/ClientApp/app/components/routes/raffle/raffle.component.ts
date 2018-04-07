import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LogService } from '../../../services/api/log.service';
import { RaffleService } from '../../../services/api/raffle.service';
import { TicketService } from '../../../services/api/ticket.service';
import { Raffle } from '../../../models/app/raffle';
import { Ticket } from '../../../models/app/ticket';
import { ConfirmDialog } from '../../dialogs/confirm.dialog';
import { LogsDialog } from '../../dialogs/logs.dialog';
import { WinnersDialog } from '../../dialogs/winners.dialog';

@Component({
    selector: 'raffle',
    templateUrl: 'raffle.component.html',
    styleUrls: ['raffle.component.css'],
    providers: [
        LogService,
        RaffleService,
        TicketService
    ],
    animations: [
        trigger('appear', [
            state('in', style({
                backgroundColor: '#555',
                opacity: 1
            })),
            transition('void => *', [
                animate(1000, keyframes([
                    style({ opacity: 0, backgroundColor: 'red', offset: 0 }),
                    style({ opacity: 1, backgroundColor: 'red', offset: 0.7 }),
                    style({ opacity: 1, backgroundColor: '#555', offset: 1.0 })
                ]))
            ])
        ])
    ]
})
export class RaffleComponent implements OnInit {
    public raffle: Raffle;
    public raffleComplete = false;

    constructor(
        public logService: LogService,
        public raffleService: RaffleService,
        public ticketService: TicketService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.raffleService.raffle.subscribe(data => {
            this.raffle = data;
        });

        this.raffleService.raffleComplete.subscribe(data => {
            this.raffleComplete = data;
        });

        this.route.paramMap.subscribe((params) => {
            try {
                const id = Number.parseInt(params.get('id'));
                this.raffleService.getRaffle(id);
                this.raffleService.checkRaffleComplete(id);
                this.ticketService.getIndexTickets(id);
            } catch {
                this.router.navigate(['/home']);
            }
        });
    }

    async removeTicket(t: Ticket) {
        if (!(this.raffle.isComplete)) {
            const result = await this.dialog.open(ConfirmDialog).afterClosed().toPromise();

            if (result === true) {
                await this.ticketService.removeTicketIndex(t);
                this.raffleService.checkRaffleComplete(this.raffle.id);
            }
        }
    }

    async addTicketIndex(input: HTMLInputElement) {
        let ticketNumber: number;

        if (!(ticketNumber = Number.parseInt(input.value))) {
            this.ticketService.snacker.sendErrorMessage(`${input.value} is not a number`);
        } else if (this.checkIndexTickets(ticketNumber)) {
            this.ticketService.snacker.sendErrorMessage(`Ticket # ${ticketNumber} has already been called`);
        } else {
            try {
                await this.ticketService.addTicketIndex(this.raffle.id, ticketNumber);
                this.raffleService.checkRaffleComplete(this.raffle.id);
            } catch {
                this.ticketService.getIndexTickets(this.raffle.id);
            }
        }

        input.value = '';
    }

    checkIndexTickets(ticket: number) {
        const check = this.ticketService.indexTickets.filter((t: Ticket) => {
            return t.ticketNumber === ticket;
        });

        return check.length > 0;
    }

    showLogs() {
        this.dialog.open(LogsDialog, {
            data: this.raffle.id,
            width: '360px'
        });
    }

    showWinners() {
        this.dialog.open(WinnersDialog, {
            data: this.raffle.id,
            width: '360px'
        });
    }
}