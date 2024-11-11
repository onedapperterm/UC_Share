import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';
import { UserTripsService } from '@app_services/user-trips/user-trips.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DetailedTripBooking, TripBooking } from 'src/app/model/booking.data';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
})
export class BookingCardComponent {
  @Input() booking!: DetailedTripBooking

  constructor(private _userTripsService: UserTripsService) {}

  public get bookedSeats(): number {
    return this.booking.trip.passengersIds
      .filter(id => id === this.booking.details.passengerId)
      .length || 0;
  }

  public cancelBooking(booking: TripBooking):void {
    this._userTripsService.cancelBooking(booking);
  }
}
