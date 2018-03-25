import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownService } from '../../../services/markdown.service';
import { ShortcutService } from '../../../services/shortcut.service';
import { MarkdownConfig } from '../../../models/core/markdownConfig';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'markdown-editor',
    templateUrl: 'markdown-editor.component.html',
    styleUrls: [ 'markdown-editor.component.css' ],
    providers: [ ShortcutService ]
})
export class MarkdownEditorComponent implements OnInit {
    @Input() placeholder: string;
    @Input() font: string;
    @Input() fontSize: number;
    @Input() minFontSize: number;
    @Input() maxFontSize: number;
    @Input() showToolbar: boolean;
    @Input() minRows: number;
    @Input() maxRows: number;
    @Input() markdown: MarkdownService;
    config: MarkdownConfig;
    @ViewChild('editor') editor: ElementRef;
    constructor(
        public shortcut: ShortcutService
    ) { }

    ngOnInit() {
        this.config = new MarkdownConfig(
            this.placeholder,
            this.font,
            this.fontSize,
            this.minFontSize,
            this.maxFontSize,
            this.minRows,
            this.maxRows,
            this.showToolbar
        );

        this.markdown.config.next(this.config);

        this.markdown.config.subscribe((config: MarkdownConfig) => {
            this.config = config;
        });

        this.shortcut.addShortcuts(this.markdown.generateShortcuts(this.editor));

        Observable.fromEvent(this.editor.nativeElement, 'keyup')
            .debounceTime(250)
            .distinctUntilChanged()
            .subscribe(() => {
                this.markdown.toHtml(this.editor.nativeElement.value);
            });
    }
}