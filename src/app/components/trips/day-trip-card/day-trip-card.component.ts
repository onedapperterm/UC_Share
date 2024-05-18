import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { UserTripsService } from '@app_services/user-trips/user-trips.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of, switchMap } from 'rxjs';
import { UserTrip } from 'src/app/model/trip.data';

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

  constructor(
    private _userTripsService: UserTripsService,
    private _userSessionService: UserSessionService,
  ) { }

  ngOnInit(): void {
    this.nextTrip$ = this._userSessionService.getRoles().pipe(
      switchMap(roles => roles.includes('driver') ? this.getNextTrip(): of(null)),
    );
  }

  private getNextTrip(): Observable<UserTrip | null> {
    return this._userTripsService.getDriverActiveTrip().pipe(
      switchMap(trip => trip ? of(trip) : this._userTripsService.getTodaysNearestPendingTrip()),
    );
  }

  activeTrip(): void {
    console.log('activeTrip');
  }

}
