import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap, Observable, } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { logger } from '@app_core/util/logger.util';
import { AuthCredentials, LoginFailResponse, LoginSuccessResponse } from '../model/auth.model';
import { Action } from '@ngrx/store';
import { AppUser, CreateUserDto, } from 'src/app/model/user.data';
import { UserSessionService } from '../services/user-session.service';
// import { NotificationsService } from '@app_services/notifications/notifications.service';

@Injectable()
export class AuthEffects {

  constructor(
    private _router: Router,
    private _actions$: Actions,
    private _authService: AuthService,
    private _userSessionService: UserSessionService,
    private _localStorageService: LocalStorageService,
    // private _notificationsService: NotificationsService,
  ) {}

  public signUpRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signUpRequest),
      exhaustMap((action) => this.onSignUpRequest(action.dto))
    )
  );

  public signUpSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      map(res => {
        let user: AppUser = {
          uid: res.uid,
          email: res.dto.email,
          phoneNumber: res.dto.phoneNumber,
          displayName: res.dto.displayName,
          firstName: res.dto.firstName,
          lastName: res.dto.lastName,
          career: res.dto.career,
          roles: res.dto.roles,
          photoURL: null,
        }
        return AuthActions.saveUserData(user);
      }),
    ),
  );

  public saveUserData$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.saveUserData),
      exhaustMap((action) => this._userSessionService.updateUserData(action)),
    ),
    { dispatch: false }
  );

  /**
   * Handles the login request action by dispatching success or failure actions accordingly.
   */
  public loginRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) => this.onLoginRequest(action.credentials))
    )
  );

  public setUserSession$ = createEffect(() =>
      this._actions$.pipe(
        ofType(AuthActions.setInitialAuthState),
        exhaustMap(() => this._authService.checkFireAuthState()),
  ));

  /**
   * Handles the login success action by navigating to '/dash' and updating local storage.
   */
  public loginSuccess$ = createEffect(() =>
      this._actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this._router.navigateByUrl(this._localStorageService.getRedirectUrl())),
      ),
    { dispatch: false }
  );

  public loginFailure$ = createEffect(() =>
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
        exhaustMap(() => this._authService.logout()),
        tap(_ => this._router.navigateByUrl('/login'))
      ),
    { dispatch: false }
  );

  private onSignUpRequest(dto: CreateUserDto): Observable<Action> {
    console.log('sigUprequest', dto);
    return this._authService.signUp(dto)
      .pipe(
        map((signUpResponse) => {
          console.log(signUpResponse);
          if('error' in signUpResponse) return AuthActions.signUpFailure(signUpResponse as LoginFailResponse);
          else return AuthActions.signUpSuccess({
            uid: (signUpResponse as LoginSuccessResponse).session.uid,
            dto: dto,
          });
        }),
      )
  }

  private onLoginRequest(credentials: AuthCredentials): Observable<Action> {
    return this._authService.login(credentials)
      .pipe(
        map((loginResponse) => {
          if('error' in loginResponse) return AuthActions.loginFailure(loginResponse as LoginFailResponse);
          else return AuthActions.loginSuccess(loginResponse as LoginSuccessResponse);
        }),
      )
  }

  private onFailure(response: LoginFailResponse):void {
    logger(`Loggin attempt failure | ${response.message}`, 'warn');
    // this._notificationsService.newNotification(response.translationKey);
    this._router.navigateByUrl('/login');
  }
}
