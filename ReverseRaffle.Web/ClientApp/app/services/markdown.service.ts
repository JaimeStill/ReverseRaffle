import { Injectable, ElementRef } from '@angular/core';
import { EditorValues } from '../models/core/editorValues';
import { Shortcut } from '../models/core/shortcut';
import { KeyCodes } from '../models/core/keycodes';
import { MarkdownConfig } from '../models/core/markdownConfig';
import * as showdown from 'showdown';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const classMap = {
    code: 'snippet',
    getValue(prop: string): string {
        switch (prop) {
            case 'code':
                return this.code;
        }
    }
}

showdown.extension('links', () => {
    return {
        type: 'output',
        regex: new RegExp(`<a `, 'g'),
        replace: `<a class="link" `
    };
});

showdown.extension('bindings', () => {
    return Object.keys(classMap).map((key: string) => {
        return {
            type: 'output',
            regex: new RegExp(`<${key}>`, 'g'),
            replace: `<${key} class="${classMap.getValue(key)}">`
        };
    });
});

@Injectable()
export class MarkdownService {
    private converter = new showdown.Converter({
        extensions: ['bindings', 'links'],
        omitExtraWLInCodeBlocks: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        simpleLineBreaks: true,
        tables: true,
        strikethrough: true,
        tasklists: true,
        smoothLivePreview: true,
        smartIndentationFix: true,
        ghMentions: true,
        ghMentionsLink: 'https://something.com/{u}', // change to whatever URL points to users
        noHeaderId: true,
        excludeTrailingPunctuationFromURLs: true,
        disableForced4SpacesIndentedSublists: true
    });

    preview = new BehaviorSubject<string>('');
    config = new BehaviorSubject(new MarkdownConfig());

    toHtml(md: string) {
        this.preview.next(this.converter.makeHtml(md));
    }

    addImage(editor: ElementRef, title?: string, url?: string) {
        title = title || 'title';
        url = url || 'file-url';
        const markdown = `![${title}](${url})`;
        const values = this.addMarkdown(editor, markdown);
        this.setCursorSelect(editor, values.start + 2, values.start + 2 + title.length);
    }

    addLink(editor: ElementRef, title?: string, url?: string) {
        title = title || 'title';
        url = url || 'link-url';
        const markdown = `[${title}](${url})`;
        const values = this.addMarkdown(editor, markdown);
        this.setCursorSelect(editor, values.start + 1, values.start + 1 + title.length);
    }

    addTable(editor: ElementRef) {
        const header = 'Column 1 | Column 2 | Column 3\n';
        const separator = '-------- |:--------:| -------:\n';
        const row = 'Left     |  Center  |    Right';
        const values = this.addMarkdown(editor, header);
        this.addMarkdown(editor, separator);
        this.addMarkdown(editor, row);
        this.setCursorSelect(editor, values.start, values.start + 8);
    }

    addCodeBlock(editor: ElementRef) {
        const values = this.getEditorValues(editor);
        const md = '```';
        const code = "function demo() { console.log('hello world!'); }";

        if (values.start === values.end) {
            editor.nativeElement.value = `${values.zeroToStart}${md}\n${code}\n${md}${values.startToLength}`;
            this.setCursorSelect(editor, values.start + 4, values.start + 4 + code.length);
        } else {
            editor.nativeElement.value = `${values.zeroToStart}${md}\n${values.startToEnd}${values.endToLength}`;
        }
    }

    addTabSpacing(editor: ElementRef) {
        const values = this.getEditorValues(editor);

        if (values.start === values.end) {
            editor.nativeElement.value = `${values.zeroToStart}    ${values.startToLength}`;
            this.setCursorSelect(editor, values.start + 4, values.start + 4);
        } else {
            editor.nativeElement.value = `${values.zeroToStart}    ${values.endToLength}`;
            this.setCursorSelect(editor, values.start + 4, values.start + 4);
        }
    }

    addMarkdown(editor: ElementRef, markdown: string): EditorValues {
        const values = this.getEditorValues(editor);

        if (values.start === values.end) {
            editor.nativeElement.value = `${values.zeroToStart}${markdown}${values.startToLength}`;
        } else {
            editor.nativeElement.value = `${values.zeroToStart}${markdown}${values.endToLength}`;
        }

        return values;
    }

    addWrappingMarkdown(editor: ElementRef, markdown: string): EditorValues {
        const values = this.getEditorValues(editor);
        const message = "replace text";

        if (values.start === values.end) {
            editor.nativeElement.value = `${values.zeroToStart}${markdown}${message}${markdown}${values.startToLength}`;
            this.setCursorSelect(editor, values.start + markdown.length, values.start + markdown.length + message.length);
        } else {
            editor.nativeElement.value = `${values.zeroToStart}${markdown}${values.startToEnd}${markdown}${values.endToLength}`;
        }

        return values;
    }

    getEditorValues(editor: ElementRef): EditorValues {
        return new EditorValues(
            editor.nativeElement.selectionStart,
            editor.nativeElement.selectionEnd,
            editor.nativeElement.value.length,
            editor.nativeElement.value
        );
    }

    setCursorSelect(editor: ElementRef, start: number, end: number) {
        if (editor.nativeElement.setSelectionRange) {
            editor.nativeElement.setSelectionRange(start, end);
        } else {
            editor.nativeElement.selectionStart = start;
            editor.nativeElement.selectionEnd = end;
        }
    }

    generateShortcuts(editor: ElementRef): Shortcut[] {
        const shortcuts = new Array<Shortcut>();
        shortcuts.push(new Shortcut(KeyCodes.One, this.addMarkdown.bind(this), [editor, '#']));
        shortcuts.push(new Shortcut(KeyCodes.Two, this.addMarkdown.bind(this), [editor, '##']));
        shortcuts.push(new Shortcut(KeyCodes.Three, this.addMarkdown.bind(this), [editor, '###']));
        shortcuts.push(new Shortcut(KeyCodes.Four, this.addMarkdown.bind(this), [editor, '####']));
        shortcuts.push(new Shortcut(KeyCodes.Five, this.addMarkdown.bind(this), [editor, '#####']));
        shortcuts.push(new Shortcut(KeyCodes.Six, this.addMarkdown.bind(this), [editor, '######']));
        shortcuts.push(new Shortcut(KeyCodes.Q, this.addMarkdown.bind(this), [editor, '> ']));
        shortcuts.push(new Shortcut(KeyCodes.U, this.addMarkdown.bind(this), [editor, '* ']));
        shortcuts.push(new Shortcut(KeyCodes.O, this.addMarkdown.bind(this), [editor, '1. ']));
        shortcuts.push(new Shortcut(KeyCodes.H, this.addMarkdown.bind(this), [editor, '***']));
        shortcuts.push(new Shortcut(KeyCodes.P, this.addImage.bind(this), [editor]));
        shortcuts.push(new Shortcut(KeyCodes.L, this.addLink.bind(this), [editor]));
        shortcuts.push(new Shortcut(KeyCodes.I, this.addWrappingMarkdown.bind(this), [editor, '*']));
        shortcuts.push(new Shortcut(KeyCodes.B, this.addWrappingMarkdown.bind(this), [editor, '**']));
        shortcuts.push(new Shortcut(KeyCodes.S, this.addWrappingMarkdown.bind(this), [editor, '`']));
        shortcuts.push(new Shortcut(KeyCodes.S, this.addCodeBlock.bind(this), [editor], true));
        shortcuts.push(new Shortcut(KeyCodes.E, this.addMarkdown.bind(this), [editor, '- [x] ']));
        shortcuts.push(new Shortcut(KeyCodes.E, this.addMarkdown.bind(this), [editor, '- [] '], true));
        shortcuts.push(new Shortcut(KeyCodes.D, this.addTable.bind(this), [editor]));
        shortcuts.push(new Shortcut(KeyCodes.Tab, this.addTabSpacing.bind(this), [editor]));
        return shortcuts;
    }
}
