import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSession } from '@app_core/auth/model/auth.model';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { UserTripsService } from '@app_services/user-trips/user-trips.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
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
    RouterLink
  ],
})
export class HomePage {

  public user$: Observable<UserSession | null> = this._userSessionService.getSession();
  public availableTrips$: Observable<UserTrip[]> = this._userTripsService.getAvailableTrips();

  constructor(
    private _userSessionService: UserSessionService,
    private _userTripsService: UserTripsService,
  ) {}

}
