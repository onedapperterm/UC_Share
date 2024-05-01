import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxChangeEventDetail, IonicModule } from '@ionic/angular';
import { IonCheckboxCustomEvent } from '@ionic/core';
import { TranslateModule } from '@ngx-translate/core';
import { DAYS_OF_WEEK, RouteDaysSchedule, WeekDay } from 'src/app/model/route.data';

export type WeekSchedule = {
  [key in keyof typeof DAYS_OF_WEEK]: DayScheduleState;
};

export interface DayScheduleState {
  active: boolean;
  hour?: string;
}

const DEFAULT_SCHEDULE: WeekSchedule = {
  sun: { active: false },
  mon: { active: false },
  tue: { active: false },
  wed: { active: false },
  thu: { active: false },
  fri: { active: false },
  sat: { active: false },
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
export class RouteActiveDaysComponent {
  @Input() set routeSchedule(schedule: WeekSchedule) {
    this.schedule.set(schedule);
  }

  private _isValid: boolean = false;
  private _touched: boolean = false;

  public schedule: WritableSignal<WeekSchedule> = signal<WeekSchedule>(DEFAULT_SCHEDULE);
  public modalHour: string = new Date().toISOString();
  public selectorHourDay: WeekDay | null = null;

  @Output() scheduleChange: EventEmitter<RouteDaysSchedule> = new EventEmitter<RouteDaysSchedule>();
  @Output() isValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  public get isValid(): boolean {
    return this._isValid;
  }

  public get touched(): boolean {
    return this._touched;
  }

  public toggleDay($event: IonCheckboxCustomEvent<CheckboxChangeEventDetail>, day: WeekDay | string) {
    const value = $event.detail.checked;
    this.schedule.update(current => {
      current[day as WeekDay].active = value;
      return current;
    });
    this._touched = true;
    this.emitEvents();
  }

  public openModal(day: WeekDay | string) {
    this._touched = true;
    this.selectorHourDay = day as WeekDay;
    let hour = this.schedule()[day as WeekDay].hour;
    this.modalHour = hour ? new Date(hour).toISOString() : new Date().toISOString();
  }

  public cancelHourSelector(): void {
    this.selectorHourDay = null;
  }

  public confirmHourSelector(): void {
    this.schedule.update(current => {
      current[this.selectorHourDay as WeekDay].hour = this.modalHour;
      return current;
    });
    this.selectorHourDay = null;
    this.emitEvents();
  }

  private emitEvents() {
    const daySchedules: RouteDaysSchedule = {}
    for (const day in this.schedule()) {
      const index = day as WeekDay;
      if (this.schedule()[index].active && this.schedule()[index]?.hour) {
        daySchedules[index] = this.schedule()[index].hour;
      } else if (this.schedule()[index].active) {
        this._isValid = false;
        this.isValidChange.emit(this._isValid);
        return;
      }
    }
    this._isValid = true;
    this.isValidChange.emit(this._isValid);
    this.scheduleChange.emit(daySchedules);
  }

}
