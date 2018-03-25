import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from '../../../models/app/ticket';

@Component({
    selector: 'ticket-card',
    templateUrl: 'ticket-card.component.html',
    styleUrls: ['ticket-card.component.css']
})
export class TicketCardComponent {
    @Input() ticket: Ticket;
    @Output() edit = new EventEmitter<Ticket>();
    @Output() delete = new EventEmitter<Ticket>();    
}
