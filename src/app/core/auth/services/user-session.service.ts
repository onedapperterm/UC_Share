import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthCredentials, AuthState } from '../model/auth.model';
import { loginRequest, logout } from '../store/auth.actions';
import { Observable, of, switchMap, } from 'rxjs';
import { selectCurrentSession, selectCurrentUserId, } from '../store/auth.selectors';
import { UserSession } from '../model/user.model';
// import { UserClientService } from '@app_services/client/user/user-client/user-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor(
    private _store: Store<AuthState>,
    // private _userClientService: UserClientService,
  ) { }

  public login(credentials: AuthCredentials):void {
    this._store.dispatch(loginRequest({ credentials: credentials }));
  }

  public logout(): void {
    this._store.dispatch(logout());
  }

  public getSession(): Observable<UserSession | null> {
    return this._store.select(selectCurrentSession);
  }

  public getUserId(): Observable<string | null> {
    return this._store.select(selectCurrentUserId);
  }

  // public getCurrentUserInfo(): Observable<SimplifiedUserData | null> {
  //   return this.getSession().pipe(
  //     switchMap(session => session ? this._userClientService.getSimplifiedUserDataById(session.id) : of(null))
  //   )
  // }

}
