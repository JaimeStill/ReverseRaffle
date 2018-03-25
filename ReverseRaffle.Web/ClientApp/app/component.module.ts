import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { PipeModule } from './pipe.module';

// Dialogs
import { ConfirmDialog } from './components/dialogs/confirm.dialog';
import { AddRaffleDialog } from './components/dialogs/add-raffle.dialog';

// Blocks
import { RaffleCardComponent } from './components/blocks/raffle-card/raffle-card.component';

// Layouts
import { SearchContainerComponent } from './components/layouts/search-container/search-container.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PipeModule,
        RouterModule
    ],
    declarations: [
        // Dialogs
        ConfirmDialog,
        AddRaffleDialog,
        // Blocks
        RaffleCardComponent,
        // Layouts
        SearchContainerComponent
    ],
    entryComponents: [
        ConfirmDialog,
        AddRaffleDialog
    ],
    exports: [
        // Modules
        CommonModule,
        FormsModule,
        MaterialModule,
        // Pipes
        PipeModule,
        // Dialogs
        ConfirmDialog,
        AddRaffleDialog,
        // Blocks
        RaffleCardComponent,
        // Layouts
        SearchContainerComponent
    ]
})
export class ComponentModule { }
