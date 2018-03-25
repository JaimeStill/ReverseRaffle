import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { MarkdownService } from '../../../services/markdown.service';
import { MarkdownConfig } from '../../../models/core/markdownConfig';

@Component({
    selector: 'markdown-toolbar',
    templateUrl: 'markdown-toolbar.component.html',
    styleUrls: ['markdown-toolbar.component.css']
})
export class MarkdownToolbarComponent implements OnInit {
    @Input() markdown: MarkdownService;
    @Input() editor: ElementRef;
    config: MarkdownConfig;

    fonts: Array<string> = [
        "Arial",
        "Arial Black",
        "Book Antiqua",
        "Charcoal",
        "Consolas",
        "Courier New",
        "Courier",
        "Gadget",
        "Geneva",
        "Georgia",
        "Helvetica",
        "Impact",
        "Lucida Console",
        "Lucida Grande",
        "Lucida Sans Unicode",
        "Monaco",
        "monospace",
        "Palatino",
        "Palatino Linotype",
        "Roboto",
        "Tahoma",
        "Times",
        "Times New Roman",
        "Trebuchet MS",
        "Verdana"
    ]
    
    fontSizes = new Array<number>();

    ngOnInit() {
        this.editor = new ElementRef(this.editor);
        this.markdown.config.subscribe((config: MarkdownConfig) => {            
            this.config = config;
            this.fontSizes = new Array<number>();
            for (let i = config.minFontSize; i <= config.maxFontSize; i++) {
                this.fontSizes.push(i);
            }
        });
    }

    addHeader(level: string) {
        this.markdown.addMarkdown(this.editor, level);
    }

    addBold() {
        this.markdown.addWrappingMarkdown(this.editor, '**');
    }

    addItalic() {
        this.markdown.addWrappingMarkdown(this.editor, '*');
    }

    addCodeSnippet() {
        this.markdown.addWrappingMarkdown(this.editor, '`');
    }

    addQuote() {
        this.markdown.addMarkdown(this.editor, '> ');
    }

    addUL() {
        this.markdown.addMarkdown(this.editor, '* ');
    }

    addOL() {
        this.markdown.addMarkdown(this.editor, '1. ');
    }

    addIncompleteTask() {
        this.markdown.addMarkdown(this.editor, '- [] ');
    }

    addCompletedTask() {
        this.markdown.addMarkdown(this.editor, '- [x] ');
    }

    addHR() {
        this.markdown.addMarkdown(this.editor, '***');
    }

    addImage() {
        this.markdown.addImage(this.editor);
    }

    addLink() {
        this.markdown.addLink(this.editor);
    }

    addCodeBlock() {
        this.markdown.addCodeBlock(this.editor);
    }

    addTable() {
        this.markdown.addTable(this.editor);
    }

    setFont(event: MatSelectChange) {
        if (event.value) {
            this.markdown.config.value.updateFont(event.value);
            this.markdown.config.next(this.markdown.config.value);
        }
    }

    setFontSize(event: MatSelectChange) {
        if (event.value) {
            this.markdown.config.value.updateFontSize(event.value);
            this.markdown.config.next(this.markdown.config.value);
        }
    }
}