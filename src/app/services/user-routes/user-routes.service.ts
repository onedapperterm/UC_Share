import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { FirestoreDatabaseService } from '@app_services/firestore/firestore-database.service';
import { where } from 'firebase/firestore';
import { Observable, filter, switchMap, take } from 'rxjs';
import { CreateUserRouteDto, UserRoute } from 'src/app/model/route.data';

@Injectable({
  providedIn: 'root'
})
export class UserRoutesService {

  private readonly _collectionName = 'user-routes';

  constructor(
    private _userSessionService: UserSessionService,
    private _firestoreDataServie: FirestoreDatabaseService,
  ) { }

  public createRoute(route: CreateUserRouteDto): Observable<DocumentReference<any>> {
    return this._firestoreDataServie.createDocument(this._collectionName, route);
  }

  public getRoutes(): Observable<UserRoute[]> {
    return this._firestoreDataServie.getCollection(this._collectionName);
  }

  public getUserRoutes(): Observable<UserRoute[]> {
    return this._userSessionService.getUserId()
      .pipe(
        take(1),
        filter(userId => !!userId),
        switchMap(userId => this.getRoutesByUserId(userId as string))
    );
  }

  public getRoutesByUserId(userId: string): Observable<UserRoute[]> {
    return this._firestoreDataServie.getCollection(this._collectionName, where('userId', '==', userId));
  }

  public getRouteById(routeId: string): Observable<any | undefined> {
    return this._firestoreDataServie.getDocument(this._collectionName, routeId);
  }
}
