import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'confirm',
    templateUrl: 'confirm.dialog.html'
})
export class ConfirmDialog {
    constructor(public dialogRef: MatDialogRef<ConfirmDialog>) { }
}
