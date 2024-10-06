import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { UserTripsService } from '@app_services/user-trips/user-trips.service';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of, switchMap } from 'rxjs';
import { UserTrip } from 'src/app/model/trip.data';
import { TripFormularComponent } from '../trip-formular/trip-formular.component';
import { RouteToTripSelectorComponent } from '../route-to-trip-selector/route-to-trip-selector.component';
import { UserRoute } from 'src/app/model/route.data';

@Component({
  selector: 'app-day-trip-card',
  templateUrl: './day-trip-card.component.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    DayTripCardComponent,
    RouterLink,
  ],
  styleUrls: ['./day-trip-card.component.scss'],
})
export class DayTripCardComponent implements OnInit {

  public activeBooking?: Observable<UserTrip | null>;
  public nextTrip$?: Observable<UserTrip | null>;
  public createButtons = [
    {
      text: 'Crear desde Ruta',
      role: 'fromRoute',
    },
    {
      text: 'Crear nuevo Viaje',
      role: 'newTrip',
    },
    {
      text: 'Mejor no',
      role: 'cancel',
    },
  ]
  public cancelButtons = [
    {
      text: 'Cancelar Viaje',
      role: 'confirm',
    },
    {
      text: 'Mejor no',
      role: 'cancel',
    },
  ]

  constructor(
    private _modalController: ModalController,
    private _userTripsService: UserTripsService,
    private _userSessionService: UserSessionService,
  ) { }

  ngOnInit(): void {
    this.nextTrip$ = this._userSessionService.isDriver().pipe(
      switchMap(isDriver => isDriver ? this.getNextTrip(): of(null)),
    );
  }

  private getNextTrip(): Observable<UserTrip | null> {
    return this._userTripsService.getDriverActiveTrip().pipe(
      switchMap(trip => trip ? of(trip) : this._userTripsService.getTodaysNearestPendingTrip()),
    );
  }

  public async openActiveTripFormular(trip?: UserTrip, route?: UserRoute): Promise<void> {
    const modal = await this._modalController.create({
      component: TripFormularComponent,
      componentProps: {
        trip: trip,
        route: route
      }
    });

    modal.present();
  }

  private async openRouteSlector(): Promise<void> {
    const modal = await this._modalController.create({
      component: RouteToTripSelectorComponent,
    });

    modal.present();

    modal.onDidDismiss().then(event => this.openActiveTripFormular(undefined, event.data));
  }

  public onCreateSheetDismiss($event: any):void {
    if($event.detail.role === 'fromRoute') {
      this.openRouteSlector();
    }

    if($event.detail.role === 'newTrip') {
      this.openActiveTripFormular();
    }
  }

  public onDeleteSheetDismiss($event: any, trip: UserTrip): void {
    if($event.detail.role === 'confirm') {
      this._userTripsService.cancelTrip(trip)
    }
  }

}
