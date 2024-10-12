import { Injectable } from '@angular/core';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { FirestoreDatabaseService } from '@app_services/firestore/firestore-database.service';
import { UserRoutesService } from '@app_services/user-routes/user-routes.service';
import { ToastController } from '@ionic/angular';
import { limit, where } from 'firebase/firestore';
import { Observable, filter, map, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { getNearestTripFromRoutes } from 'src/app/converter/route-trip.converter';
import { DatabaseCollectionName } from 'src/app/model/firestore-database.data';
import { CreateUserTripDto, TripStatus, UserTrip } from 'src/app/model/trip.data';

@Injectable({
  providedIn: 'root'
})
export class UserTripsService {

  private readonly _collectionName: DatabaseCollectionName = 'user-trips';

  constructor(
    private _toastController: ToastController,
    private _userRoutesService: UserRoutesService,
    private _userSessionService: UserSessionService,
    private _firestoreDataServie: FirestoreDatabaseService,
  ) { }

  public createAndActiveTrip(trip: CreateUserTripDto): Observable<any>  {
    return this._firestoreDataServie.createDocument(this._collectionName, trip);
  }

  public updateTrip(trip: UserTrip): Observable<void> {
    return this._firestoreDataServie.setDocument({
      collection: this._collectionName,
      id: trip.id,
      data: trip
    });
  }

  public getDriverUserTrips(): Observable<UserTrip[]> {
    return this._userSessionService.getUserId()
      .pipe(
        take(1),
        filter(userId => !!userId),
        switchMap(userId => this.getDriverTripsByUserId(userId as string))
    );
  }

  public getDriverTripsByUserId(userId: string, max: number = 10, statusFilter?: TripStatus): Observable<UserTrip[]> {
    const constraints = [
      where('userId', '==', userId),
      limit(max),
    ]

    if(statusFilter) constraints.push(where('status', '!=', statusFilter));

    return this._firestoreDataServie.getCollection(
      this._collectionName,
      ...constraints
    );
  }

  public getTripById(tripId: string): Observable<any | undefined> {
    return this._firestoreDataServie.getDocument(this._collectionName, tripId);
  }

  public getAvailableTrips(max?: number):Observable<UserTrip[]> {
    return this._userSessionService.getUserId().pipe(
      take(1),
      filter(userId => !!userId),
      switchMap(userId => this.getAllAvailableActiveTrips(max)
        .pipe(
          map(trips => trips.filter(trip => trip.userId !== userId))
        )),
    )
  }

  private getAllAvailableActiveTrips(max: number = 30): Observable<UserTrip[]> {
    return this._firestoreDataServie
      .getCollection(
        this._collectionName,
        where('status', '==', 'active'),
        limit(max)
      )
      .pipe(
        map(trips => trips.filter((trip: UserTrip) => trip.seats > trip.passengersIds.length))
      );
  }

  public getTodaysNearestPendingTrip(): Observable<UserTrip | null> {
    return this._userRoutesService.getUserRoutes().pipe(
      map(routes => getNearestTripFromRoutes(routes)),
    )
  }

  public getDriverActiveTrip(): Observable<UserTrip | null> {
    return this._userSessionService.getUserId().pipe(
      take(1),
      filter(userId => !!userId),
      switchMap(userId => this.getDriverTripsByUserId(userId as string)),
      map(trips => trips.filter(trip => trip.status === 'active')[0] || null),
      tap(trip => this.validateTrip(trip))
    );
  }

  private validateTrip(trip: UserTrip | null): void {
    if(!trip) return;

    //TODO: validate date and hour and update status accordingly
  }

  public cancelTrip(trip: UserTrip):void {
    this.updateTrip({...trip, ...{status: 'canceled'}})
      .subscribe(_ => this.presentToast('Viaje cancelado'))
  }

  private async presentToast(message: string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  public getPassegerActiveTrip(): Observable<UserTrip | null> {
    return this._userSessionService.getUserId().pipe(
      take(1),
      filter(userId => !!userId),
      switchMap(userId => this._firestoreDataServie.getCollection(this._collectionName, where('passengersIds', 'array-contains', userId))),
      map(trips => trips.filter((trip: UserTrip) => trip.status === 'active')[0] || null)
    );
  }

}
