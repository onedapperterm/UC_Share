import { Injectable } from '@angular/core';
import { AuthCredentials, FirebaseUserResponse, LoginFailResponse, LoginResponse, LoginSuccessResponse, } from '../model/auth.model';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Action } from '@ngrx/store';
import { loginFailure, loginSuccess } from '../store/auth.actions';
import { CreateUserDto } from 'src/app/model/user.data';
import { UserSessionService } from './user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _ngFireAuth: AngularFireAuth,
    private _userSessionService: UserSessionService,
  ) {}

  public login(credentials: AuthCredentials):Observable<LoginResponse> {
    return from(signInWithEmailAndPassword(getAuth(), credentials.emailAddress, credentials.password))
      .pipe(
        catchError((error) => this.handleRequestError(error)),
        switchMap(response=> this.validateResponse(response as UserCredential)),
      )
  }

  public signUp(dto: CreateUserDto):Observable<LoginResponse> {
    return from(createUserWithEmailAndPassword(getAuth(), dto.email, dto.password))
      .pipe(
        catchError((error) => this.handleRequestError(error)),
        map(response => this.validateSingUpResponse(response as UserCredential)),
      )
  }

  private validateSingUpResponse(response: UserCredential): LoginResponse {
    if('error' in response) return response;

    const errorResponse: LoginFailResponse = {
      error: new Error('User could not be created'),
      message: 'User could not be created',
      translationKey: 'noUserCreated'
    }

    if(!response.user) return errorResponse;

    const successResponse: LoginSuccessResponse = {
      session: {
        uid: response.user.uid,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        photoURL: response.user.photoURL,
        displayName: response.user.displayName,
        roles: []
      },
    }
    return successResponse;
  }

  private handleRequestError(error: Error): Observable<LoginFailResponse> {
    return of({
      error: error,
      message: error?.message || 'Unknown server error',
      translationKey: error?.name || 'notifications.auth.unknownFail' //TODO: write and implement message key resolver
    });
  }

  private validateResponse(response: FirebaseUserResponse | LoginFailResponse): Observable<LoginResponse> {
    if('error' in response) return of(response);

    const errorResponse: LoginFailResponse = {
      error: new Error('User not found'),
      message: 'User not found',
      translationKey: 'noUserFound'
    }

    if(!response.user) return of(errorResponse);

    return this._userSessionService.getUserDataById(response.user.uid).pipe(
      map(userData => {
        if (!userData || !response.user) return errorResponse;

        const successResponse: LoginSuccessResponse = {
          session: {
            uid: response.user.uid,
            email: response.user.email,
            phoneNumber: userData.phoneNumber,
            photoURL: userData.photoURL,
            displayName: userData.displayName,
            roles: userData.roles,
          },
        }
        return successResponse;
      }));

  }

  public checkFireAuthState():Observable<Action> {
    return this._ngFireAuth.authState.pipe(
      switchMap(authState => authState ? this._userSessionService.getUserDataById(authState.uid): of(null)),
      map(authState => {
        console.log('authState:', authState);
        if (authState) {
          return loginSuccess({
            session: {
              uid: authState.uid,
              email: authState.email,
              phoneNumber: authState.phoneNumber,
              photoURL: authState.photoURL,
              displayName: authState.displayName,
              roles: authState.roles,
            }
          });
        } else {
          return loginFailure({
            error: new Error('User not found'),
            message: 'User not found',
            translationKey: 'noUserFound'
          });
        }
      }
      ),
    );
  }

  public logout():Observable<void> {
    return from(this._ngFireAuth.signOut());
  }

}

