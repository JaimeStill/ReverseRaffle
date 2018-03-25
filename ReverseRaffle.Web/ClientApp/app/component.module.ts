import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { PipeModule } from './pipe.module';

// Dialogs
import { ConfirmDialog } from './components/dialogs/confirm.dialog';

// Blocks

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
        ConfirmDialog,
        SearchContainerComponent
    ],
    entryComponents: [
        ConfirmDialog
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PipeModule,
        ConfirmDialog,
        SearchContainerComponent
    ]
})
export class ComponentModule { }
