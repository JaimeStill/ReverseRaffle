import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit = 50, ellipsis = '...') {
        return value.length <= limit ? value : `${value.substr(0, limit)}${ellipsis}`;
    }
}
