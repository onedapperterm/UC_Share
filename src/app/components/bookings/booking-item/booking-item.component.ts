import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserTripsService } from '@app_services/user-trips/user-trips.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { TripBooking } from 'src/app/model/booking.data';
import { UserTrip } from 'src/app/model/trip.data';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    RouterLink,
  ]
})
export class BookingItemComponent implements OnInit {
  @Input() booking!: TripBooking;
  public trip$!: Observable<UserTrip | null>;

  constructor(
    private _userTripsService: UserTripsService,
  ) { }

  ngOnInit() {
    if(this.booking) this.trip$ = this._userTripsService.getTripById(this.booking.tripId);
  }
}
