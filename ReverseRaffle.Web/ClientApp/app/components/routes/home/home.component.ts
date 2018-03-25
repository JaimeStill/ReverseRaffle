import { Component } from '@angular/core';
import { MarkdownService } from '../../../services/markdown.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [ MarkdownService ]
})
export class HomeComponent {
    constructor(public markdown: MarkdownService) { }
}
