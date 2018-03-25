import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MarkdownService } from '../../../services/markdown.service';

@Component({
    selector: 'markdown-preview',
    templateUrl: 'markdown-preview.component.html',
    styleUrls: ['markdown-preview.component.css']
})
export class MarkdownPreviewComponent implements OnInit {
    @Input() markdown: MarkdownService;
    preview: SafeHtml;

    constructor(public sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.markdown.preview.subscribe((preview: string) => {
            this.preview = this.sanitizer.bypassSecurityTrustHtml(preview);
        });
    }
}