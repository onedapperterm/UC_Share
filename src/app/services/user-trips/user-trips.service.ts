import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { BookingService } from '@app_services/booking/booking.service';
import { FirestoreDatabaseService } from '@app_services/firestore/firestore-database.service';
import { UserRoutesService } from '@app_services/user-routes/user-routes.service';
import { ToastController } from '@ionic/angular';
import { limit, where } from 'firebase/firestore';
import { Observable, filter, forkJoin, from, map, of, switchMap, take, tap } from 'rxjs';
import { getNearestTripFromRoutes } from 'src/app/converter/route-trip.converter';
import { DetailedTripBooking, TripBooking } from 'src/app/model/booking.data';
import { DatabaseCollectionName } from 'src/app/model/firestore-database.data';
import { CreateUserTripDto, TripStatus, UserTrip } from 'src/app/model/trip.data';

@Injectable({
  providedIn: 'root'
})
export class UserTripsService {

  private readonly _tripsCollection: DatabaseCollectionName = 'user-trips';
  private readonly _bookingsCollection: DatabaseCollectionName = 'bookings';

  constructor(
    private _toastController: ToastController,
    private _userRoutesService: UserRoutesService,
    private _userSessionService: UserSessionService,
    private _firestoreDataServie: FirestoreDatabaseService,
    private _bookingService: BookingService,
    private _router: Router,
    private _angularFirestore: AngularFirestore
  ) { }

  //---------- DRIVER OPERATIONS --------------

  public createAndActiveTrip(trip: CreateUserTripDto): Observable<any>  {
    return this._firestoreDataServie.createDocument(this._tripsCollection, trip);
  }

  public updateTrip(trip: UserTrip): Observable<void> {
    return this._firestoreDataServie.setDocument<UserTrip>({
      collection: this._tripsCollection,
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
      this._tripsCollection,
      ...constraints
    );
  }

  public getTripById(tripId: string): Observable<UserTrip | null> {
    return this._firestoreDataServie.getDocument<UserTrip>(this._tripsCollection, tripId);
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
        this._tripsCollection,
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

  public cancelTrip(tripId: string):Observable<any> {
    const tripRef = this._angularFirestore.collection(this._tripsCollection).doc(tripId)
    const bookingsRef = this._angularFirestore.collection<TripBooking>(
      this._bookingsCollection,
      ref => ref.where('tripId', '==', tripId)
    );

    return from(this._angularFirestore.firestore.runTransaction(async (transaction) => {

      const bookingsSnapshot = await bookingsRef.ref.get();

      const tripSnapshot = await transaction.get(tripRef.ref);

      if (!tripSnapshot.exists) {
        throw new Error('Trip not found');
      }

      transaction.update(tripRef.ref, { status: 'canceled', });

      bookingsSnapshot.docs.forEach(doc => {
        transaction.update(doc.ref, {
          status: 'canceled-by-driver'
        });
      });

      return {
        success: true,
        updatedBookings: bookingsSnapshot.size
      };
    }));
  }

  public completeTrip(tripId: string):Observable<any> {
    const tripRef = this._angularFirestore.collection(this._tripsCollection).doc(tripId)
    const bookingsRef = this._angularFirestore.collection<TripBooking>(
      this._bookingsCollection,
      ref => ref.where('tripId', '==', tripId)
    );

    return from(this._angularFirestore.firestore.runTransaction(async (transaction) => {

      const bookingsSnapshot = await bookingsRef.ref.get();

      const tripSnapshot = await transaction.get(tripRef.ref);

      if (!tripSnapshot.exists) {
        throw new Error('Trip not found');
      }

      transaction.update(tripRef.ref, { status: 'completed', });

      bookingsSnapshot.docs.forEach(doc => {
        transaction.update(doc.ref, {
          status: 'completed'
        });
      });

      return {
        success: true,
        updatedBookings: bookingsSnapshot.size
      };
    }));
  }

  //---------- PASSENGER OPERATIONS --------------

  public getPassegerActiveBooking(): Observable<DetailedTripBooking | null> {
    return this._userSessionService.getUserId().pipe(
      take(1),
      filter(userId => !!userId),
      switchMap(userId => this._bookingService.getBookingsByUserId(userId as string, 1, 'confirmed')),
      map(bookings => bookings && bookings.length > 0 ? bookings[0] : null),
      switchMap(booking => booking
        ? forkJoin({details: of(booking), trip: this.getTripById(booking.tripId)})
        : of(null)),
      map(response => response && response.trip ? response as DetailedTripBooking : null),
    );
  }

  public bookTrip(trip: UserTrip, seats: number):void {
    if(trip.seats - trip.passengersIds.length < seats) {
      this.presentToast('No hay suficientes puestos');
      return
    }

    this._userSessionService.getUserId().pipe(
      take(1),
      filter(userId => !!userId && userId !== trip.userId),
      switchMap(userId => forkJoin([
        this.updateTripOnBooking(trip, userId as string, seats),
        this._bookingService.createBooking(userId as string, trip.id)
      ]))
    ).subscribe({
        next: _ => {
          this.presentToast('Booking confirmado!');
          this._router.navigateByUrl('/');
        },
        error: _ => this.presentToast('Algo salio mal, intenta de nuevo'),
      })
  }

  private updateTripOnBooking(trip: UserTrip, passengerId: string, seats: number): Observable<any> {
    const bookedSeats = new Array(seats).fill(passengerId);
    const updatedTrip: UserTrip = {
      ...trip,
      ...{passengersIds: [...trip.passengersIds, ...bookedSeats]}
    }

    return this.updateTrip(updatedTrip);
  }

  public cancelBooking(booking: TripBooking):void {
    const updatedBooking: TripBooking = {...booking, ...{status: 'canceled-by-passenger'}}

    this.getTripById(booking.tripId).pipe(
      filter((trip): trip is UserTrip => !!trip),
      map(trip => this.removePassengerFromTrip(trip, booking.passengerId)),
      switchMap(trip => forkJoin([
        this.updateTrip(trip),
        this._bookingService.updateBooking(updatedBooking)
      ])),
    ).subscribe({
        next: _ => this.presentToast('Booking cancelado!'),
        error: _ => this.presentToast('Algo salio mal, intenta de nuevo'),
    });
  }

  public getUserBookings(): Observable<TripBooking[]> {
    return this._userSessionService.getUserId().pipe(
      take(1),
      filter((userId): userId is string => !!userId),
      switchMap(userId => this._bookingService.getBookingsByUserId(userId))
    );
  }

  //---------- UTILITIES --------------

  private async presentToast(message: string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  private validateTrip(trip: UserTrip | null): void {
    if(!trip) return;

    //TODO: validate date and hour and update status accordingly
  }

  private removePassengerFromTrip(trip: UserTrip, passengerId: string): UserTrip {
    const passengersIds = trip.passengersIds.filter(id => id !== passengerId);
    return { ...trip, ...{passengersIds: passengersIds} }
  }
}
