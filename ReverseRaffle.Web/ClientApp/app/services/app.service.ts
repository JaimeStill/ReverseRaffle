import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {
    title = new BehaviorSubject('Webstack');

    setTitle(title: string) {
        this.title.next(title);
    }

    urlEncode(text: string): string {
        text = text.toLowerCase().replace(/\s/g, '-');
        return text.replace(/[^a-zA-Z0-9-.]/g, '');
    }
}
