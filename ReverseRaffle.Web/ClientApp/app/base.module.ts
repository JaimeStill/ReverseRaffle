import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from './app.module';
import { AppComponent } from './components/app.component';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppModule
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class BaseModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
