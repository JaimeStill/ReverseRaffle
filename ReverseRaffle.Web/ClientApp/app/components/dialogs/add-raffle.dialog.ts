import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RaffleService } from '../../services/api/raffle.service';
import { Raffle } from '../../models/app/raffle';

@Component({
    selector: 'add-raffle',
    templateUrl: 'add-raffle.dialog.html'
})
export class AddRaffleDialog {
    raffle = new Raffle();

    constructor(
        public dialogRef: MatDialogRef<AddRaffleDialog>,
        @Inject(MAT_DIALOG_DATA) public raffleService: RaffleService
    ) { }

    saveRaffle() {
        this.raffleService.addRaffle(this.raffle)
            .subscribe(
                data => this.dialogRef.close(data),
                err => this.raffleService.snacker.sendErrorMessage(err)
            );
    }
}