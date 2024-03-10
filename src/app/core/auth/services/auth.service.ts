import { Injectable } from '@angular/core';
import { AuthCredentials, FirebaseUserResponse, LoginFailResponse, LoginResponse, LoginSuccessResponse, } from '../model/auth.model';
import { Observable, catchError, from, map, of, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _ngFireAuth: AngularFireAuth) {}

  public login(credentials: AuthCredentials):Observable<LoginResponse> {
    return from(signInWithEmailAndPassword(getAuth(), credentials.emailAddress, credentials.password))
      .pipe(
        catchError((error) => this.handleRequestError(error)),
        tap(response => console.log('firebase:', response)),
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
        exp: (response as FirebaseUserResponse).user.stsTokenManager.expirationTime,
      },
    }

    return successResponse;
  }

  public logout():Observable<void> {
    return from(this._ngFireAuth.signOut());
  }

  public getAuthState():Observable<firebase.default.User | null> {
    return this._ngFireAuth.user;
  }


}

