import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { UserTripsService } from '@app_services/user-trips/user-trips.service'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { UserTrip } from 'src/app/model/trip.data'
import { Observable, filter, switchMap, } from 'rxjs'
import { TripCheckpointsComponent } from '@app_components/trips/trip-checkpoints/trip-checkpoints.component'
import { UserSessionService } from '@app_core/auth/services/user-session.service'
import { AppUser } from 'src/app/model/user.data'

@Component({
  selector: 'app-trip-booking',
  templateUrl: './trip-booking.page.html',
  styleUrls: ['./trip-booking.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    TripCheckpointsComponent,
    RouterLink
  ],
})
export class TripBookingPage implements OnInit {
  public trip$!: Observable<UserTrip | null>;
  public driver$!: Observable<AppUser | null>  ;
  public selectedSeats: number = 0;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userTripService: UserTripsService,
    private _userSessionService: UserSessionService,
  ) {}

  ngOnInit() {
    const tripId = this._activatedRoute.snapshot.paramMap.get('id')
    if (tripId) {
      this.trip$ = this._userTripService.getTripById(tripId)
      this.driver$ = this.trip$.pipe(
        filter(trip => !!trip),
        switchMap(trip => this._userSessionService.getUserDataById((trip as UserTrip).userId))
      );
    }
    else this._router.navigate(['/home'])
  }

  public onAdd():void {
    this.selectedSeats++;
  }

  public onRemove():void {
    this.selectedSeats--;
  }

  public onConfirm(trip: UserTrip):void {
    this._userTripService.bookTrip(trip, this.selectedSeats);
  }

  ngOndestroy() {
    console.log('vemola')
  }
}
