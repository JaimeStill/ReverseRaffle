import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TruncatePipe
    ],
    exports: [
        TruncatePipe
    ]
})
export class PipeModule { }
