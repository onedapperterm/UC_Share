import { Injectable } from '@angular/core';
import { FirestoreDatabaseService } from '@app_services/firestore/firestore-database.service';
import { limit, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { BookingStatus, CreateTripBookingDto, TripBooking } from 'src/app/model/booking.data';
import { DatabaseCollectionName } from 'src/app/model/firestore-database.data';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly _collectionName: DatabaseCollectionName = 'bookings';

  constructor(
    private _firestoreDataServie: FirestoreDatabaseService,
  ) { }

  public createBooking(passengerId: string, tripId: string):Observable<any> {
    return this._firestoreDataServie
      .createDocument<CreateTripBookingDto>(this._collectionName, {
        passengerId,
        tripId,
        status: 'confirmed'
      })
  }

  public updateBooking(booking: TripBooking): Observable<any> {
    return this._firestoreDataServie.setDocument<TripBooking>({
      collection: this._collectionName,
      id: booking.id,
      data: booking
    });
  }

  public getBookingsByUserId(userId: string, max: number = 10, status?: BookingStatus): Observable<TripBooking[]> {
    const constraints = [
      where('passengerId', '==', userId),
      limit(max),
    ]

    if(status) constraints.push(where('status', '==', status));

    return this._firestoreDataServie.getCollection(
      this._collectionName,
      ...constraints
    )
  }

}
