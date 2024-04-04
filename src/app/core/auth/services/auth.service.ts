import { Injectable } from '@angular/core';
import { AuthCredentials, FirebaseUserResponse, LoginFailResponse, LoginResponse, LoginSuccessResponse, } from '../model/auth.model';
import { Observable, catchError, from, map, of, filter } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Action } from '@ngrx/store';
import { loginFailure, loginSuccess } from '../store/auth.actions';
import { CreateUserDto } from 'src/app/model/user.data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _ngFireAuth: AngularFireAuth,
  ) {}

  public login(credentials: AuthCredentials):Observable<LoginResponse> {
    return from(signInWithEmailAndPassword(getAuth(), credentials.emailAddress, credentials.password))
      .pipe(
        catchError((error) => this.handleRequestError(error)),
        map(response => this.validateResponse(response as UserCredential)),
      )
  }

  public signUp(dto: CreateUserDto):Observable<LoginResponse> {
    return from(createUserWithEmailAndPassword(getAuth(), dto.email, dto.password))
      .pipe(
        catchError((error) => this.handleRequestError(error)),
        map(response => this.validateResponse(response as UserCredential)),
      )
  }

  private handleRequestError(error: Error): Observable<LoginFailResponse> {
    return of({
      error: error,
      message: error?.message || 'Unknown server error',
      translationKey: error?.name || 'notifications.auth.unknownFail' //TODO: write and implement message key resolver
    });
  }

  //TODO: call the user service to get the user data
  private validateResponse(response: FirebaseUserResponse | LoginFailResponse):LoginResponse {
    if('error' in response) return response;

    if(!response.user) {
      const errorResponse: LoginFailResponse = {
        error: new Error('User not found'),
        message: 'User not found',
        translationKey: 'noUserFound'
      }
      return errorResponse;
    }

    const successResponse: LoginSuccessResponse = {
      session: {
        uid: response.user.uid,
        email: response.user.email,
        phoneNumber: response.user.providerData[0].phoneNumber,
        photoURL: response.user.providerData[0].photoURL,
      },
    }
    return successResponse;
  }

  public checkFireAuthState():Observable<Action> {
    return this._ngFireAuth.authState.pipe(
      filter(authState => !!authState),
      map(authState => {
        console.log('authState:', authState?.toJSON());
        if (authState) {
          return loginSuccess({
            session: {
              uid: authState.uid,
              email: authState.email,
              phoneNumber: authState.phoneNumber,
              photoURL: authState.photoURL,
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

