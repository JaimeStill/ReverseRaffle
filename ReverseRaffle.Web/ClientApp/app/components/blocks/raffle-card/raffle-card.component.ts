import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Raffle } from '../../../models/app/raffle';

@Component({
    selector: 'raffle-card',
    templateUrl: 'raffle-card.component.html',
    styleUrls: ['raffle-card.component.css']
})
export class RaffleCardComponent {
    @Input() raffle: Raffle;
    @Output() edit = new EventEmitter<Raffle>();
    @Output() delete = new EventEmitter<Raffle>();
}
