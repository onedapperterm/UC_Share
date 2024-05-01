import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';
import { Theme } from '@app_core/settings/model/core-settings.model';
import { InputCustomEvent, IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, filter, switchMap, take } from 'rxjs';
import { RouteActiveDaysComponent, } from '../route-active-days/route-active-days.component';
import { CreateUserRouteDto, RouteDaysSchedule, UserRoute } from 'src/app/model/route.data';
import { UserRoutesService } from '@app_services/user-routes/user-routes.service';
import { UserSessionService } from '@app_core/auth/services/user-session.service';

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
export class RouteFormularComponent implements OnInit {
  @Input() route: UserRoute | undefined;

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
    private _formBuilder: FormBuilder,
    private _modalController: ModalController,
    private _colorThemeService: ColorThemeService,
    private _userRoutesService: UserRoutesService,
    private _userSessionService: UserSessionService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    if (this.route) {
      this.routeForm.patchValue({
        from: this.route.from,
        neighborhood: this.route.neighborhood,
        district: this.route.district,
      });
      this.checkpoints.set(this.route.checkpoints);
      this.comments = this.route.comments || '';
    }
  }

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
    if (!this.routeForm.valid) return;

    this._userSessionService.getUserId()
      .pipe(
        take(1),
        filter(userId => !!userId),
        switchMap(userId => {
          const routeDto: CreateUserRouteDto = {
            userId: userId as string,
            status: 'active',
            checkpoints: this.checkpoints(),
            from: this.routeForm.value.from as string,
            neighborhood: this.routeForm.value.neighborhood as string,
            district: this.routeForm.value.district as string,
            comments: this.comments,
            ...this.schedule
          };
          return this._userRoutesService.createRoute(routeDto)
        })
      ).subscribe(_ => this._modalController.dismiss(null, 'confirm'));
  }
}
