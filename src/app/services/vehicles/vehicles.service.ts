import { Injectable } from '@angular/core';
import { CreateVehicleDto, Vehicle } from 'src/app/model/vehicle.data';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { FirestoreDatabaseService } from '@app_services/firestore/firestore-database.service';
import { where } from 'firebase/firestore';
import { Observable, filter, switchMap, take } from 'rxjs';
import { DatabaseCollectionName } from 'src/app/model/firestore-database.data';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private readonly _collectionName: DatabaseCollectionName = 'user-vehicles';

  constructor(
    private _userSessionService: UserSessionService,
    private _firestoreDataServie: FirestoreDatabaseService,
  ) { }

  public createVehicle(veichle: CreateVehicleDto): Observable<DocumentReference<any>>{
    return this._firestoreDataServie.createDocument(this._collectionName, veichle);
  }

  public getUserVehicles(): Observable<Vehicle[]> {
    return this._userSessionService.getUserId()
      .pipe(
        take(1),
        filter(userId => !!userId),
        switchMap(userId => this.getVehiclesByUserId(userId as string))
    );
  }

  public getVehiclesByUserId(userId: string): Observable<Vehicle[]> {
    return this._firestoreDataServie.getCollection(this._collectionName, where('userId', '==', userId));
  }

  public getVehicleById(vehicleId: string): Observable<any | undefined> {
    return this._firestoreDataServie.getDocument(this._collectionName, vehicleId);
  }

  public updateVehicle(vehicle: Vehicle): Observable<void> {
    return this._firestoreDataServie.setDocument({
      collection: this._collectionName,
      id: vehicle.id,
      data: vehicle
    });
  }

  public deleteVehicle(vehicleId: string): Observable<void> {
    return this._firestoreDataServie.deleteDocument(this._collectionName, vehicleId);
  }

}
