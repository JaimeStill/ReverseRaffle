import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppService } from './services/app.service';
import { CoreApiService } from './services/core-api.service';
import { SidepanelService } from './services/sidepanel.service';
import { SnackerService } from './services/snacker.service';
import { ThemeService } from './services/theme.service';
import { ShortcutService } from './services/shortcut.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    AppService,
    CoreApiService,
    SidepanelService,
    SnackerService,
    ThemeService,
    ShortcutService
  ],
  exports: [
    HttpModule
  ]
})
export class ServicesModule { }
