import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TicketService } from '../../services/api/ticket.service';
import { Ticket } from '../../models/app/ticket';

@Component({
    selector: 'winners-dialog',
    templateUrl: 'winners.dialog.html',
    styleUrls: ['winners.dialog.css'],
    providers: [ TicketService ]
})
export class WinnersDialog implements OnInit {
    winners = new Array<Ticket>();

    constructor(
        public service: TicketService,
        @Inject(MAT_DIALOG_DATA) public raffleId: number
    ) { }

    ngOnInit() {
        this.service.getWinningTickets(this.raffleId);
        this.service.winningTickets.subscribe(data => {
            this.winners = data;
        });
    }
}