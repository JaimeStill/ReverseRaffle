import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TicketService } from '../../services/api/ticket.service';
import { Ticket } from '../../models/app/ticket';
import { Raffle } from '../../models/app/raffle';

@Component({
    selector: 'add-ticket',
    templateUrl: 'add-ticket.dialog.html'
})
export class AddTicketDialog {
    ticket = new Ticket();

    constructor(
        public dialogRef: MatDialogRef<AddTicketDialog>,
        @Inject(MAT_DIALOG_DATA) public data: { id: number, service: TicketService }
    ) {
        this.ticket.raffle = new Raffle();
        this.ticket.raffle.id = data.id;
    }

    saveTicket() {
        if (this.validateTicket()) {
            this.data.service.addTicket(this.ticket)
                .subscribe(
                    () => this.dialogRef.close(this.ticket),
                    err => this.data.service.snacker.sendErrorMessage(err)
                );
        }
    }

    validateTicket(): boolean {
        if (!(this.ticket.ticketNumber) || !(this.ticket.name)) {
            this.data.service.snacker.sendErrorMessage('Ticket must have a number and be assigned to someone');
            return false;
        }

        if (this.ticket.ticketNumber > 250 || this.ticket.ticketNumber < 1) {
            this.data.service.snacker.sendErrorMessage('Ticket Number must be between 1 and 250');
            return false;
        }

        return true;
    }
}