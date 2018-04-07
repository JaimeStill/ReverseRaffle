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
import { LogsDialog } from './components/dialogs/logs.dialog';
import { WinnersDialog } from './components/dialogs/winners.dialog';

// Blocks
import { RaffleCardComponent } from './components/blocks/raffle-card/raffle-card.component';
import { TicketCardComponent } from './components/blocks/ticket-card/ticket-card.component';
import { TicketComponent } from './components/blocks/ticket/ticket.component';

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
        LogsDialog,
        WinnersDialog,
        // Blocks
        RaffleCardComponent,
        TicketCardComponent,
        TicketComponent,
        // Layouts
        SearchContainerComponent
    ],
    entryComponents: [
        ConfirmDialog,
        AddRaffleDialog,
        AddTicketDialog,
        LogsDialog,
        WinnersDialog
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
        LogsDialog,
        WinnersDialog,
        // Blocks
        RaffleCardComponent,
        TicketCardComponent,
        TicketComponent,
        // Layouts
        SearchContainerComponent
    ]
})
export class ComponentModule { }
