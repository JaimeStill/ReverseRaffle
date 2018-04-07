import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { LogService } from '../../services/api/log.service';
import { Log } from '../../models/app/log';
import { ConfirmDialog } from './confirm.dialog';

@Component({
    selector: 'logs-dialog',
    templateUrl: 'logs.dialog.html',
    styleUrls: ['logs.dialog.css'],
    providers: [ LogService ]
})
export class LogsDialog implements OnInit {
    logs = new Array<Log>();

    constructor(
        public service: LogService,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public raffleId: number
    ) { }

    ngOnInit() {
        this.service.getLogs(this.raffleId);
        this.service.logs.subscribe(data => this.logs = data);
    }

    removeLog(log: Log) {
        this.dialog.open(ConfirmDialog)
            .afterClosed()
            .subscribe(res => {
                if (res) {
                    this.service.removeLog(log);
                }
            });
    }
}
