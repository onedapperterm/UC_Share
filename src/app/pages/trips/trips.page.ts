import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { RouterLink } from '@angular/router'
import { DayTripCardComponent } from '@app_components/trips/day-trip-card/day-trip-card.component'
import { UserSessionService } from '@app_core/auth/services/user-session.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    DayTripCardComponent,
    RouterLink,
  ],
})
export class TripsPage {

  public isDriver$: Observable<boolean> = this._userSessionService.isDriver();

  constructor(
    private _userSessionService: UserSessionService,
  ) {}

}
