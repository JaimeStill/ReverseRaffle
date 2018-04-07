import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CoreApiService } from '../core-api.service';
import { SnackerService } from '../snacker.service';
import { Log } from '../../models/app/log';

@Injectable()
export class LogService {
    logs = new BehaviorSubject<Log[]>([]);
    loading = false;

    constructor(
        public coreApi: CoreApiService,
        public snacker: SnackerService
    ) { }

    getLogs(raffleId: number) {
        this.loading = true;
        this.coreApi.get<Log[]>('/api/log/getLogs/' + raffleId)
            .subscribe(
                data => {
                    this.logs.next(data);
                    this.loading = false;
                },
                err => {
                    this.snacker.sendErrorMessage(err);
                    this.loading = false;
                });
    }

    addLog(log: Log) {
        this.coreApi.post('/api/log/addLog', JSON.stringify(log))
            .subscribe(
                () => this.getLogs(log.raffle.id),
                err => this.snacker.sendErrorMessage(err)
            );
    }

    removeLog(log: Log) {
        this.coreApi.post('/api/log/removeLog', JSON.stringify(log.id))
            .subscribe(
                () => {
                    this.snacker.sendSuccessMessage(`Log: ${log.input} successfully removed`);
                    this.getLogs(log.raffle.id);
                },
                err => this.snacker.sendErrorMessage(err)
            );
    }
}
