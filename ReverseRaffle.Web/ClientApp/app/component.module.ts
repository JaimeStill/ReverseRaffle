import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { PipeModule } from './pipe.module';

// Dialogs
import { ConfirmDialog } from './components/dialogs/confirm.dialog';
import { AddRaffleDialog } from './components/dialogs/add-raffle.dialog';
import { AddTicketDialog } from './components/dialogs/add-ticket.dialog';

// Blocks
import { RaffleCardComponent } from './components/blocks/raffle-card/raffle-card.component';
import { TicketCardComponent } from './components/blocks/ticket-card/ticket-card.component';

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
        AddTicketDialog,
        // Blocks
        RaffleCardComponent,
        TicketCardComponent,
        // Layouts
        SearchContainerComponent
    ],
    entryComponents: [
        ConfirmDialog,
        AddRaffleDialog,
        AddTicketDialog
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
        AddTicketDialog,
        // Blocks
        RaffleCardComponent,
        TicketCardComponent,
        // Layouts
        SearchContainerComponent
    ]
})
export class ComponentModule { }
