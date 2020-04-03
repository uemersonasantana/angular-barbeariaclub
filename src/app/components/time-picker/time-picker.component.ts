import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { matDatepickerAnimations } from './animations';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
  animations: [
    matDatepickerAnimations.transformPanel,
    matDatepickerAnimations.fadeInCalendar
  ],
})
export class TimePickerComponent implements OnInit {

  @Input()
  date: Date;

  @Output()
  setDate = new EventEmitter<Date>(false);

  hours: number;
  minutes: number;

  constructor() { }

  ngOnInit() {
    if (this.date) {
      this.hours = this.date.getHours();
      this.minutes = this.date.getMinutes();
    } else {
      this.hours = 0;
      this.minutes = 0;
    }
  }

  public modifyHours(isDecreasing = false) {
    if (isDecreasing) {
      if (this.hours <= 0) {
        this.hours = 23;
      } else {
        this.hours -= 1;
      }
    } else {
      if (this.hours >= 23) {
        this.hours = 0;
      } else {
        this.hours += 1;
      }
    }
  }

  public modifyMinutes(isDecreasing = false) {
    if (isDecreasing) {
      if (this.minutes <= 0) {
        this.minutes = 59;
      } else {
        this.minutes -= 1;
      }
    } else {
      if (this.minutes >= 59) {
        this.minutes = 0;
      } else {
        this.minutes += 1;
      }
    }
  }

  public onSet() {
    const newDate = new Date(this.date.getTime());
    newDate.setHours(this.hours);
    newDate.setMinutes(this.minutes);
    this.setDate.emit(newDate);
  }
}