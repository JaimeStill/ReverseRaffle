import {
    Component,
    AfterViewInit,
    Input,
    ElementRef,
    ViewChild,
    ChangeDetectorRef
} from '@angular/core';

import * as prism from 'prismjs';

@Component({
    selector: 'prism',
    template: `
    <div hidden="true" #rawContent>
        <ng-content></ng-content>
    </div>
    <section class="code-container">
        <pre><code [innerHtml]="content" class="block language-{{language}}"></code></pre>
    </section>
    `
})
export class PrismComponent implements AfterViewInit {
    @Input() language: string;
    @ViewChild('rawContent') rawContent: ElementRef;
    content: string;

    constructor(public elementRef: ElementRef, public cdr: ChangeDetectorRef) { }

    ngAfterViewInit() {
        this.content = prism.highlight(this.rawContent.nativeElement.textContent.trim(), prism.languages[this.language], prism.languages[this.language]);
        this.cdr.detectChanges();
    }
}