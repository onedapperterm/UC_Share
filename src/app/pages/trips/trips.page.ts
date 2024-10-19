import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { RouterLink } from '@angular/router'
import { DayTripCardComponent } from '@app_components/trips/day-trip-card/day-trip-card.component'
import { UserSessionService } from '@app_core/auth/services/user-session.service'
import { Observable, map } from 'rxjs'
import { UserTripsService } from '@app_services/user-trips/user-trips.service'
import { UserTrip } from 'src/app/model/trip.data'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    DayTripCardComponent,
    RouterLink,
  ],
})
export class TripsPage {

  public isDriver$: Observable<boolean> = this._userSessionService.isDriver();
  public trips$: Observable<UserTrip[]> = this._userTripsService.getDriverUserTrips()
    .pipe(map(trips => trips.filter(trip => trip.status !== 'active')))

  constructor(
    private _userSessionService: UserSessionService,
    private _userTripsService: UserTripsService,
  ) {}

}
