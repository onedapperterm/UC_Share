import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { UserTripsService } from '@app_services/user-trips/user-trips.service'
import { ActivatedRoute, Router } from '@angular/router'
import { UserTrip } from 'src/app/model/trip.data'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-trip-booking',
  templateUrl: './trip-booking.page.html',
  styleUrls: ['./trip-booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule],
})
export class TripBookingPage implements OnInit {

  public trip$!: Observable<UserTrip>;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userTripService: UserTripsService
  ) {}

  ngOnInit() {
    const tripId = this._activatedRoute.snapshot.paramMap.get('id');
    if (tripId) this.trip$ = this._userTripService.getTripById(tripId)
    else this._router.navigate(['/home']);
  }
}
