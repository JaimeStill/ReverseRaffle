import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { PipeModule } from './pipe.module';

// Dialogs
import { ConfirmDialog } from './components/dialogs/confirm.dialog';

// Blocks
import { SidepanelComponent } from './components/blocks/sidepanel/sidepanel.component';
import { PanelLinkComponent } from './components/blocks/sidepanel/panel-link.component';
import { DatetimePickerComponent } from './components/blocks/datetime-picker/datetime-picker.component';
import { PrismComponent } from './components/blocks/snippets/prism.component';
import { HostedCodeComponent } from './components/blocks/snippets/hosted-code.component';
import { MarkdownEditorComponent } from './components/blocks/markdown-editor/markdown-editor.component';
import { MarkdownPreviewComponent } from './components/blocks/markdown-editor/markdown-preview.component';
import { MarkdownToolbarComponent } from './components/blocks/markdown-editor/markdown-toolbar.component';

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
        SidepanelComponent,
        PanelLinkComponent,
        DatetimePickerComponent,
        PrismComponent,
        HostedCodeComponent,
        MarkdownEditorComponent,
        MarkdownPreviewComponent,
        MarkdownToolbarComponent,
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
        SidepanelComponent,
        PanelLinkComponent,
        DatetimePickerComponent,
        PrismComponent,
        HostedCodeComponent,
        MarkdownEditorComponent,
        MarkdownPreviewComponent,
        MarkdownToolbarComponent,
        SearchContainerComponent
    ]
})
export class ComponentModule { }
