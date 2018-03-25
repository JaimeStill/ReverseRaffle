import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppService } from './services/app.service';
import { CoreApiService } from './services/core-api.service';
import { SnackerService } from './services/snacker.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    AppService,
    CoreApiService,
    SnackerService
  ],
  exports: [
    HttpModule
  ]
})
export class ServicesModule { }
