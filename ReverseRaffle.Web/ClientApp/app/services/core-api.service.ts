import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Factory } from '../models/core/factory';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoreApiService {
    constructor(public http: Http) { }

    extractData(res: Response) {
        try {
            return res.json() || {};
        } catch (error) {
            return res;
        }
    }

    extractText(res: Response) {
        try {
            return res.text();
        } catch (error) {
            return res;
        }
    }

    extractGeneric<T>(res: Response, factory: Factory<T>) {
        return res.json().map((obj: T) => {
            return Object.assign(factory.create(), obj);
        });
    }    

    handleError(error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || body.Message || JSON.stringify(body);
            errMsg = `${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getRequestOptions(): RequestOptions {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return new RequestOptions({ headers: headers });
    }

    getUploadOptions(): RequestOptions {
        const headers = new Headers({
            'Accept': 'application/json'
        });

        headers.delete('Content-Type');

        return new RequestOptions({ headers: headers });
    }

    get<T>(url: string): Observable<T> {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getText(url: string): Observable<string> {
        const headers = new Headers({
            'Content-Type': 'text/plain'
        });
        headers.delete('Pragma');
        return this.http.get(url, new RequestOptions({ headers: headers }))
            .map(this.extractText)
            .catch(this.handleError);
    }

    getGeneric<T>(url: string, factory: Factory<T>): Observable<T> {
        return this.http.get(url)
            .map((res: Response) => this.extractGeneric<T>(res, factory))
            .catch(this.handleError);
    }

    post<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
        return this.http.post(url, body, options ? options : this.getRequestOptions())
            .map(this.extractData)
            .catch(this.handleError);
    }
}
