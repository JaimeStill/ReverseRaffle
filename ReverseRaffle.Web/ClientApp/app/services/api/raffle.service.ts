import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CoreApiService } from '../core-api.service';
import { SnackerService } from '../snacker.service';
import { Raffle } from '../../models/app/raffle';
import { Factory } from '../../models/core/factory';

const raffleFactory = new Factory(Raffle);

@Injectable()
export class RaffleService {
    raffles = new BehaviorSubject<Raffle[]>([]);
    completedRaffles = new BehaviorSubject<Raffle[]>([]);
    raffle = new BehaviorSubject<Raffle>(new Raffle());
    raffleComplete = new BehaviorSubject<boolean>(false);

    loading = false;
    loadingCompleted = false;
    loadingRaffle = false;

    constructor(
        public coreApi: CoreApiService,
        public snacker: SnackerService
    ) {}

    getRaffles() {
        this.loading = true;
        this.coreApi.getGenericArray<Raffle>('/api/raffle/getRaffles', raffleFactory)
            .subscribe(
                data => {
                    this.loading = false;
                    this.raffles.next(data);
                },
                err => {
                    this.loading = false;
                    this.snacker.sendErrorMessage(err);
                }
            );
    }

    getCompletedRaffles() {
        this.loadingCompleted = true;
        this.coreApi.getGenericArray<Raffle>('/api/raffle/getCompletedRaffles', raffleFactory)
            .subscribe(
                data => {
                    this.loadingCompleted = false;
                    this.completedRaffles.next(data);
                },
                err => {
                    this.loadingCompleted = false;
                    this.snacker.sendErrorMessage(err);
                }
            );
    }

    getRaffle(id: number) {
        this.loadingRaffle = false;
        this.coreApi.getGeneric<Raffle>('/api/raffle/getRaffle/' + id, raffleFactory)
            .subscribe(
                data => {
                    this.loadingRaffle = false;
                    this.raffle.next(data);
                },
                err => {
                    this.loadingRaffle = false;
                    this.snacker.sendErrorMessage(err);
                }
            );
    }

    checkRaffleComplete(id: number) {
        this.coreApi.get<boolean>('/api/raffle/checkRaffleComplete/id')
            .subscribe(
                data => this.raffleComplete.next(data),
                err => this.snacker.sendErrorMessage(err)
            );
    }

    addRaffle(raffle: Raffle): Observable<number> {
        return this.coreApi.post<number>('/api/raffle/addRaffle', JSON.stringify(raffle));
    }

    updateRaffle(raffle: Raffle) {
        this.coreApi.post('/api/raffle/updateRaffle', JSON.stringify(raffle))
            .subscribe(
                () => {
                    this.getRaffle(raffle.id);
                    this.snacker.sendSuccessMessage(`${raffle.title} successfully updated`);
                },
                err => this.snacker.sendErrorMessage(err)
            );
    }

    deleteRaffle(raffle: Raffle) {
        this.coreApi.post('/api/raffle/deleteRaffle', JSON.stringify(raffle.id))
            .subscribe(
                () => {
                    this.getRaffles();
                    this.snacker.sendSuccessMessage(`${raffle.title} successfully deleted`);
                },
                err => this.snacker.sendErrorMessage(err)
            );
    }
}
