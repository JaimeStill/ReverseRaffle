import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from './material.module';
import { PipeModule } from './pipe.module';
import { ComponentModule } from './component.module';

import { HomeComponent } from './components/routes/home/home.component';

const routes: Route[] = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'home' }
]

@NgModule({
    imports: [
        MaterialModule,
        PipeModule,
        ComponentModule,
        CommonModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent,
        MaterialModule,
        PipeModule,
        ComponentModule,
        CommonModule,
        FormsModule,
        RouterModule
    ]
})
export class RouteModule { }
