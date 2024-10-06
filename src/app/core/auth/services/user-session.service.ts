import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthCredentials, AuthState, UserSession } from '../model/auth.model';
import { loginRequest, logout, signUpRequest } from '../store/auth.actions';
import { Observable, map, of, switchMap } from 'rxjs';
import { selectCurrentRoles, selectCurrentSession, selectCurrentUserId, } from '../store/auth.selectors';
import { FirestoreDatabaseService } from '@app_services/firestore/firestore-database.service';
import { DatabaseCollectionName } from 'src/app/model/firestore-database.data';
import { AppUser, CreateUserDto, Role } from 'src/app/model/user.data';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private readonly collection: DatabaseCollectionName = 'users';

  constructor(
    private _store: Store<AuthState>,
    private _firestoreDatabaseService: FirestoreDatabaseService,
  ) { }

  public login(credentials: AuthCredentials):void {
    this._store.dispatch(loginRequest({ credentials: credentials }));
  }

  public signUp(data: CreateUserDto): void {
    this._store.dispatch(signUpRequest({ dto: data }));
  }

  public logout(): void {
    this._store.dispatch(logout());
  }

  public getSession(): Observable<UserSession | null> {
    return this._store.select(selectCurrentSession);
  }

  public getRoles(): Observable<Role[]> {
    return this._store.select(selectCurrentRoles);
  }

  public isDriver(): Observable<boolean> {
    return this.getRoles().pipe(map(roles => roles?.includes('driver')));
  }

  public hasRole(role: Role): Observable<boolean> {
    return this.getRoles().pipe(map(roles => roles.includes(role)));
  }

  public getUserId(): Observable<string | null> {
    return this._store.select(selectCurrentUserId);
  }

  public updateUserData(data: AppUser): Observable<void> {
    const doc = {
      data: data,
      id: data.uid,
      collection: this.collection,
    }
    return this._firestoreDatabaseService.setDocument(doc)
  }

  public getCurrentUserData(): Observable<AppUser | null> {
    return this.getUserId().pipe(
      switchMap(uid=> uid ? this._firestoreDatabaseService.getDocument(this.collection, uid) as Observable<AppUser | null> : of(null)));
  }

  public getUserDataById(userId: string): Observable<AppUser | null> {
    return this._firestoreDatabaseService.getDocument(this.collection, userId) as Observable<AppUser | null>;
  }

}
