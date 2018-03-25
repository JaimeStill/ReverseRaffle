import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CoreApiService } from './core-api.service';
import { SnackerService } from './snacker.service';

@Injectable()
export class CodeService {
    source = new BehaviorSubject<string>('');

    constructor(
        public http: Http,
        public coreApi: CoreApiService,
        public snacker: SnackerService
    ) { }

    getSource(url: string) {
        this.coreApi.getText(url)
            .subscribe(
                data => this.source.next(data),
                err => this.snacker.sendErrorMessage(err)
            );
    }
}