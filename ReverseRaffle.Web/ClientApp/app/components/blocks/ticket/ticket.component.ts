import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from '../../../models/app/ticket';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css']
})
export class TicketComponent {
    @Input() ticket: Ticket;
    @Output() remove = new EventEmitter<Ticket>();
}