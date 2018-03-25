import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatSliderChange } from '@angular/material';

@Component({
    selector: 'datetime-picker',
    templateUrl: 'datetime-picker.component.html',
    styleUrls: [ 'datetime-picker.component.css' ]
})
export class DatetimePickerComponent implements OnInit {
    @Input() date = new Date(Date.now());
    @Input() label = 'Date';
    @Input() stepMinutes = 5;
    hours: number;
    minutes: number;
    
    @Output() change = new EventEmitter<Date>();

    ngOnInit() {
        this.date = this.date ? new Date(this.date) : new Date(Date.now());
        this.hours = this.date.getHours();
        this.minutes = this.date.getMinutes();
    }

    dateChanged(event: MatDatepickerInputEvent<Date>) {
        if (event.value) {
            this.date = event.value;
            this.setDate(this.date, this.hours, this.minutes);
            this.change.emit(this.date);
        }
    }

    hoursChanged(event: MatSliderChange) {
        if (event.value) {
            this.hours = event.value;
            this.setDate(this.date, this.hours, this.minutes);
            this.change.emit(this.date);
        }
    }

    minutesChanged(event: MatSliderChange) {
        if (event.value) {
            this.minutes = event.value;
            this.setDate(this.date, this.hours, this.minutes);
            this.change.emit(this.date);
        }
    }

    setDate(date: Date, hours: number, minutes: number) {
        date.setUTCHours(hours);
        date.setUTCMinutes(minutes);
        return date;
    }
}