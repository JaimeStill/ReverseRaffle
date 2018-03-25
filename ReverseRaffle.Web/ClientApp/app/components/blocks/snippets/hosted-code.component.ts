import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CodeService } from '../../../services/code.service';

import * as prism from 'prismjs';

@Component({
    selector: 'hosted-code',
    templateUrl: 'hosted-code.component.html',
    providers: [
        CodeService
    ]
})
export class HostedCodeComponent implements AfterViewInit {
    @Input() url = '';
    @Input() language = '';
    source: string;

    constructor(public cdr: ChangeDetectorRef, public code: CodeService) { }

    ngAfterViewInit() {
        this.code.getSource(this.url);

        this.code.source.subscribe(source => {
            this.source = prism.highlight(source.trim(), prism.languages[this.language]);
            this.cdr.detectChanges();
        });
    }
}