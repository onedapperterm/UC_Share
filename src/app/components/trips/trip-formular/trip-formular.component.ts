import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';
import { Theme } from '@app_core/settings/model/core-settings.model';
import { UserTripsService } from '@app_services/user-trips/user-trips.service';
import { IonicModule } from '@ionic/angular';
import { InputCustomEvent, ModalController } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, filter, switchMap, take } from 'rxjs';
import { CreateUserTripDto, UserTrip } from 'src/app/model/trip.data';

@Component({
  selector: 'app-trip-formular',
  templateUrl: './trip-formular.component.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./trip-formular.component.scss'],
})
export class TripFormularComponent  implements OnInit {
  @Input() trip?: UserTrip;

  public mode: 'create'| 'activate' | 'edit' = 'create';
  public theme$: Observable<Theme> = this._colorThemeService.currentTheme();
  public checkpoints: WritableSignal<string[]> = signal<string[]>(['']);
  public comments: string = '';
  public tripForm = this._formBuilder.group({
    from: ['', Validators.required],
    neighborhood: ['', Validators.required],
    district: ['', Validators.required],
    seats: [0, Validators.required],
    price: [0, Validators.required],
    vehicle: ['', Validators.required],
    plates: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _modalController: ModalController,
    private _userTripsService: UserTripsService,
    private _colorThemeService: ColorThemeService,
    private _userSessionService: UserSessionService,
  ) { }

  ngOnInit() {
    this.fillForm();
  }

  private fillForm(): void {
    if (this.trip) {
      this.mode = this.trip.status == 'active' ? 'edit' : 'activate';
      this.tripForm.patchValue({
        from: this.trip.from,
        neighborhood: this.trip.neighborhood,
        district: this.trip.district,
        seats: this.trip.seats,
        price: this.trip.price,
        vehicle: this.trip.vehicle,
        plates: this.trip.plates,
      });
      this.checkpoints.set(this.trip.checkpoints);
      this.comments = this.trip.comments || '';
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


  public cancel() {
    return this._modalController.dismiss(null, 'cancel');
  }

  public confirm() {
    if (!this.tripForm.valid) return;

    if (this.mode === 'create') this.activeAndPublishNewTrip();
    else if (this.mode === 'activate') this.activeTrip();
    else this.updateTrip();
  }

  private activeAndPublishNewTrip(): void {
    this._userSessionService.getUserId()
      .pipe(
        take(1),
        filter(userId => !!userId),
        switchMap(userId => {
          const tripDto: CreateUserTripDto = {
            userId: userId as string,
            status: 'active',
            checkpoints: this.checkpoints(),
            from: this.tripForm.value.from as string,
            neighborhood: this.tripForm.value.neighborhood as string,
            district: this.tripForm.value.district as string,
            comments: this.comments,
            seats: this.tripForm.value.seats as number,
            price: this.tripForm.value.price as number,
            vehicle: this.tripForm.value.vehicle as string,
            plates: this.tripForm.value.plates as string,
            date: new Date().toISOString(),
            passengersIds: [],
            hour: new Date().toISOString(),
          };
          return this._userTripsService.createAndActiveTrip(tripDto);
        })
      ).subscribe(_ => this._modalController.dismiss(null, 'confirm'));
  }

  private activeTrip(): void {
    const tripDto: CreateUserTripDto = {
      userId: this.trip?.userId as string,
      status: 'active',
      checkpoints: this.checkpoints(),
      from: this.tripForm.value.from as string,
      neighborhood: this.tripForm.value.neighborhood as string,
      district: this.tripForm.value.district as string,
      comments: this.comments,
      seats: this.tripForm.value.seats as number,
      price: this.tripForm.value.price as number,
      vehicle: this.tripForm.value.vehicle as string,
      plates: this.tripForm.value.plates as string,
      date: new Date().toISOString(),
      passengersIds: [],
      hour: new Date().toISOString(),
    };
    this._userTripsService.createAndActiveTrip(tripDto).subscribe(_ => this._modalController.dismiss(null, 'confirm'));
  }

  private updateTrip(): void {
    if (!this.trip) return;
    const trip: UserTrip = {
      ...this.trip,
      checkpoints: this.checkpoints(),
      from: this.tripForm.value.from as string,
      neighborhood: this.tripForm.value.neighborhood as string,
      district: this.tripForm.value.district as string,
      seats: this.tripForm.value.seats as number,
      price: this.tripForm.value.price as number,
      vehicle: this.tripForm.value.vehicle as string,
      plates: this.tripForm.value.plates as string,
      comments: this.comments,
    };

    this._userTripsService.updateTrip(trip).subscribe(_ => this._modalController.dismiss(null, 'confirm'));
  }

}
