import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor(
        public router: Router
    ) { }

    openRaffle() {
        this.router.navigate(['/raffle', this.raffle.id]);
    }
}
