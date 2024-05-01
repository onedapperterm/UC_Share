import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';
import { Theme } from '@app_core/settings/model/core-settings.model';
import { InputCustomEvent, IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RouteActiveDaysComponent, } from '../route-active-days/route-active-days.component';
import { CreateUserRouteDto, RouteDaysSchedule } from 'src/app/model/route.data';

@Component({
  selector: 'app-route-formular',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouteActiveDaysComponent,
    IonicModule,
    TranslateModule,
  ],
  templateUrl: './route-formular.component.html',
  styleUrls: ['./route-formular.component.scss'],
})
export class RouteFormularComponent {

  private schedule: RouteDaysSchedule = {};

  public theme$: Observable<Theme> = this._colorThemeService.currentTheme();
  public checkpoints: WritableSignal<string[]> = signal<string[]>(['']);
  public comments: string = '';
  public routeForm = this._formBuilder.group({
    from: ['', Validators.required],
    neighborhood: ['', Validators.required],
    district: ['', Validators.required],
  });

  constructor(
    private _modalController: ModalController,
    private _formBuilder: FormBuilder,
    public _colorThemeService: ColorThemeService,
  ) { }

  public addCheckpoint() {
    this.checkpoints.update(current => [...current, '']);
  }

  public removeCheckpoint(index: number) {
    this.checkpoints.update(current => current.filter((_, i) => i !== index));
  }

  public updateCheckpoint(event: InputCustomEvent, index: number) {
    const value = event.target.value || '';
    let current = this.checkpoints();
    current.splice(index, 1, value as string);
    this.checkpoints.set(current);
  }

  public onScheduleChange(schedule: RouteDaysSchedule): void {
    this.schedule = schedule;
  }

  public onScheduleValidChange(isValid: boolean): void {
    console.log(isValid);
  }

  public cancel() {
    return this._modalController.dismiss(null, 'cancel');
  }

  public confirm() {
    const routeDto: CreateUserRouteDto = {
      userId: '1',
      status: 'active',
      checkpoints: this.checkpoints(),
      from: this.routeForm.value.from || '',
      neighborhood: this.routeForm.value.neighborhood || '',
      district: this.routeForm.value.district || '',
      comments: this.comments,
      ...this.schedule
    };

    console.log(routeDto);
    return this._modalController.dismiss(routeDto, 'confirm');
  }
}
