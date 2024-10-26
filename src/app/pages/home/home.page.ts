import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingItemComponent } from '@app_components/bookings/booking-item/booking-item.component';
import { UserSession } from '@app_core/auth/model/auth.model';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { UserTripsService } from '@app_services/user-trips/user-trips.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';
import { DetailedTripBooking, TripBooking } from 'src/app/model/booking.data';
import { UserTrip } from 'src/app/model/trip.data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    AsyncPipe,
    DatePipe,
    TranslateModule,
    RouterLink,
    BookingItemComponent
  ],
})
export class HomePage {

  public user$: Observable<UserSession | null> = this._userSessionService.getSession();
  public activeBooking$: Observable<DetailedTripBooking | null> = this._userTripsService.getPassegerActiveBooking();
  public activeTrip$: Observable<UserTrip | null> = this._userTripsService.getDriverActiveTrip();
  public availableTrips$: Observable<UserTrip[]> = this._userTripsService.getAvailableTrips();
  public bookings$: Observable<TripBooking[]> = this._userTripsService.getUserBookings()
    .pipe(map(bookings => bookings.filter(booking => booking.status !== 'confirmed')));

  constructor(
    private _userSessionService: UserSessionService,
    private _userTripsService: UserTripsService,
  ) {}

  public cancelBooking(booking: TripBooking):void {
    this._userTripsService.cancelBooking(booking);
  }
}
