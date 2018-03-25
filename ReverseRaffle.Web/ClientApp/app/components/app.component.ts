import { Component } from '@angular/core';
import { SidepanelService } from '../services/sidepanel.service';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../models/theme';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public sidepanel: SidepanelService, public theme: ThemeService) {}
}
