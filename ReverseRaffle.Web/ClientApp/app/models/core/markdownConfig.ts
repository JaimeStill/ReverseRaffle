export class MarkdownConfig {
    placeholder: string;
    font: string;
    fontSize: number;
    minFontSize: number;
    maxFontSize: number;
    minRows: number;
    maxRows: number;
    showToolbar: boolean;

    constructor(
        placeholder?: string, 
        font?: string, 
        fontSize?: number, 
        minFontSize?: number, 
        maxFontSize?: number, 
        minRows?: number, 
        maxRows?: number, 
        showToolbar?: boolean
    ) {
        this.placeholder = placeholder || 'Markdown';
        this.font = font || 'Consolas';
        this.fontSize = fontSize || 16;
        this.minFontSize = minFontSize || 10;
        this.maxFontSize = maxFontSize || 20;
        this.minRows = minRows || 20;
        this.maxRows = maxRows || 25;
        this.showToolbar = showToolbar;
    }

    updateFont(font: string) {
        this.font = font;
    }

    updateFontSize(size: number) {
        this.fontSize = size;
    }
}
