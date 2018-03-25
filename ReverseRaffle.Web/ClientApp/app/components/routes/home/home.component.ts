import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RaffleService } from '../../../services/api/raffle.service';
import { Raffle } from '../../../models/app/raffle';
import { ConfirmDialog } from '../../dialogs/confirm.dialog';
import { AddRaffleDialog } from '../../dialogs/add-raffle.dialog';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [ RaffleService ]
})
export class HomeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        public router: Router,
        public raffleService: RaffleService
    ) { }

    ngOnInit() {
        this.raffleService.getRaffles();
    }

    addRaffle() {
        this.dialog.open(AddRaffleDialog, {
            data: this.raffleService,
            width: '680px'
        })
        .afterClosed()
        .subscribe(res => {
            if (res) {
                this.router.navigate(['/manage-raffle', res]);
            }
        });
    }

    editRaffle(raffle: Raffle) {
        this.router.navigate(['/manage-raffle', raffle.id]);
    }

    deleteRaffle(raffle: Raffle) {
        this.dialog.open(ConfirmDialog)
            .afterClosed()
            .subscribe(res => {
                if (res) {
                    this.raffleService.deleteRaffle(raffle);
                }
            });
    }
}
