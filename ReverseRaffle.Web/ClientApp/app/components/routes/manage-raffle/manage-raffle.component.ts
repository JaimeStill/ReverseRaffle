import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RaffleService } from '../../../services/api/raffle.service';
import { TicketService } from '../../../services/api/ticket.service';
import { Raffle } from '../../../models/app/raffle';
import { Ticket } from '../../../models/app/ticket';
import { AddTicketDialog } from '../../dialogs/add-ticket.dialog';
import { ConfirmDialog } from '../../dialogs/confirm.dialog';

@Component({
    selector: 'manage-raffle',
    templateUrl: 'manage-raffle.component.html',
    styleUrls: ['manage-raffle.component.css'],
    providers: [
        RaffleService,
        TicketService
    ]
})
export class ManageRaffleComponent implements OnInit {
    raffle: Raffle;
    tickets: Array<Ticket>;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public raffleService: RaffleService,
        public ticketService: TicketService
    ) { }

    ngOnInit() {
        this.raffleService.raffle.subscribe(data => {
            this.raffle = data;
            this.ticketService.getTickets(data.id);
        });

        this.route.paramMap.subscribe(params => {
            try {
                const id = Number.parseInt(params.get('id'));
                this.raffleService.getRaffle(id);
            } catch {
                this.router.navigate(['/home']);
            }
        });
    }

    addTicket() {
        this.dialog.open(AddTicketDialog, {
            data: { id: this.raffle.id, service: this.ticketService },
            width: '680px'
        })
        .afterClosed()
        .subscribe((res: Ticket) => {
            if (res) {
                this.ticketService.getTickets(this.raffle.id);
                this.ticketService.snacker.sendSuccessMessage(`Ticket # ${res.ticketNumber} successfully issued to ${res.name}`);
            }
        });
    }

    editTicket(ticket: Ticket) {
        this.ticketService.updateTicket(ticket);
    }

    deleteTicket(ticket: Ticket) {
        this.dialog.open(ConfirmDialog)
            .afterClosed()
            .subscribe(res => {
                if (res) {
                    this.ticketService.deleteTicket(ticket);
                }
            });
    }

    generateTickets() {
        this.ticketService.generateRandomTickets(this.raffle.id);
    }
}
