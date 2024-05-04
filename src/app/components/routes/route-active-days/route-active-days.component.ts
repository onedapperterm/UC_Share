import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxChangeEventDetail, IonicModule } from '@ionic/angular';
import { IonCheckboxCustomEvent } from '@ionic/core';
import { TranslateModule } from '@ngx-translate/core';
import { DAYS_OF_WEEK, RouteDaysSchedule, WeekDay } from 'src/app/model/route.data';

export type WeekSchedule = {
  [key in keyof typeof DAYS_OF_WEEK]: string | null;
};

const DEFAULT_SCHEDULE: WeekSchedule = {
  sun: null,
  mon: null,
  tue: null,
  wed: null,
  thu: null,
  fri: null,
  sat: null,
};

@Component({
  selector: 'app-route-active-days',
  templateUrl: './route-active-days.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  styleUrls: ['./route-active-days.component.scss'],
})
export class RouteActiveDaysComponent implements OnInit {
  @Input() initialSchedule?: RouteDaysSchedule;

  private _isValid: boolean = false;
  private _touched: boolean = false;

  public schedule: WritableSignal<WeekSchedule> = signal<WeekSchedule>(DEFAULT_SCHEDULE);
  public hourSelectorValue: string = new Date().toISOString();
  public selectorHourDay: WeekDay | null = null;
  public showCancelSelector: boolean = true;

  @Output() scheduleChange: EventEmitter<RouteDaysSchedule> = new EventEmitter<RouteDaysSchedule>();
  @Output() isValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  public get isValid(): boolean {
    return this._isValid;
  }

  public get touched(): boolean {
    return this._touched;
  }

  ngOnInit() {
    this.fillSchedule();
  }

  private fillSchedule(): void {
    if(this.initialSchedule) {
      this.schedule.update(current => { return {...current, ...this.initialSchedule} });
    }
  }


  public toggleDay($event: IonCheckboxCustomEvent<CheckboxChangeEventDetail>, day: WeekDay | string) {
    const value = $event.detail.checked ? new Date().toISOString() : null;
    this.schedule.update(current => {
      current[day as WeekDay] = value;
      return current;
    });
    this._touched = true;
    if(value) this.openHourSelector(day as WeekDay, false);
    else this.cancelHourSelector();
    this.emitEvents();
  }

  public openHourSelector(day: WeekDay | string, showCancel: boolean = true) {
    this._touched = true;
    this.showCancelSelector = showCancel;
    this.selectorHourDay = day as WeekDay;
    let hour = this.schedule()[this.selectorHourDay];
    this.hourSelectorValue = hour ? new Date(hour).toISOString() : new Date().toISOString();
  }

  public cancelHourSelector(): void {
    this.selectorHourDay = null;
  }

  public confirmHourSelector(): void {
    this.schedule.update(current => {
      current[this.selectorHourDay as WeekDay] = this.hourSelectorValue;
      return current;
    });
    this.selectorHourDay = null;
    this.emitEvents();
  }

  private emitEvents() {
    const daySchedules: RouteDaysSchedule = {}

    for (const day in this.schedule()) {
      const index = day as WeekDay;
      const value = this.schedule()[index];
      if(value) daySchedules[index] = value;
    }

    this._isValid = Object.keys(daySchedules).length > 0;
    this.isValidChange.emit(this._isValid);
    this.scheduleChange.emit(daySchedules);
  }

}
