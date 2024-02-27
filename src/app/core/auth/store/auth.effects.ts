import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap, Observable, } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { logger } from '@app_core/util/logger.util';
import { AuthCredentials, LoginFailResponse, LoginResponse, LoginSuccessResponse } from '../model/auth.model';
import { Action } from '@ngrx/store';
// import { NotificationsService } from '@app_services/notifications/notifications.service';

@Injectable()
export class AuthEffects {

  constructor(
    private _router: Router,
    private _actions$: Actions,
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    // private _notificationsService: NotificationsService,
  ) {}

  /**
   * Handles the login request action by dispatching success or failure actions accordingly.
   */
  public loginRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) => this.onRequest(action.credentials))
    )
  );

  /**
   * Handles the login success action by navigating to '/dash' and updating local storage.
   */
  public loginSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((loginSuccessResponse) => this.onSuccess(loginSuccessResponse)),
      ),
    { dispatch: false }
  );

  public loginFailure$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap((loginFailureResponse) => this.onFailure(loginFailureResponse)),
      ),
    { dispatch: false }
  );


  /**
   * Handles the logout action by navigating to '/login' and removing stored state from local storage.
   */
  public logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.logout),
        tap(_ => {
          this._localStorageService.removeStoredAuthState();
          this._router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  private onRequest(credentials: AuthCredentials): Observable<Action> {
    return this._authService.login(credentials)
      .pipe(
        map((loginResponse) => this.validateSuccesResponse( loginResponse )),
      )
  }

  private validateSuccesResponse(response: LoginResponse):Action {
    if('error' in response) return AuthActions.loginFailure(response as LoginFailResponse);
    else return AuthActions.loginSuccess(response as LoginSuccessResponse);
  }

  private onSuccess(response: LoginSuccessResponse):void {
    this._localStorageService.setAuthState(response.accessToken, response.refreshToken);
    this._router.navigateByUrl(this._localStorageService.getRedirectUrl());
  }

  private onFailure(response: LoginFailResponse):void {
    logger(`Loggin attempt failure | ${response.message}`, 'warn');
    // this._notificationsService.newNotification(response.translationKey);
    this._router.navigateByUrl('');
  }
}
