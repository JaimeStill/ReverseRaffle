import { NgModule } from '@angular/core';

import { ServicesModule } from './services.module';
import { RouteModule } from './route.module';

import { AppComponent } from './components/app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ServicesModule,
        RouteModule
    ]
})
export class AppModule {}
