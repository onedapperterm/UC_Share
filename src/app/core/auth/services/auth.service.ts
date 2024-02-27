import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthCredentials, DecodedAccessToken, LoginFailResponse, LoginResponse, LoginSuccessResponse, } from '../model/auth.model';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { UserSessionService } from './user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) {}

  public login(credentials: AuthCredentials):Observable<LoginResponse> {
    console.log('login', credentials);
    return of({}).pipe(
      delay(200),
      catchError((error) => this.handleRequestError(error)),
      map(response => this.validateResponse(response))
    )
  }

  private handleRequestError(error: Error): Observable<LoginFailResponse> {
    return of({
      error: error,
      message: error?.message || 'Unknown server error',
      translationKey: error?.message || 'notifications.auth.unknownFail' //TODO: write and implement message key resolver
    });
  }

  private validateResponse(response: LoginResponse):LoginResponse {
    if('error' in response) return response;

    const decodedToken: DecodedAccessToken | null = {} as DecodedAccessToken;

    if(!decodedToken) {
      const errorResponse: LoginFailResponse = {
        message: 'Invalid acces token',
        translationKey: 'notifications.auth.unknownFail',
        error: new Error
      };
      return errorResponse;
    }

    const successResponse: LoginSuccessResponse = {} as LoginSuccessResponse;

    return successResponse;
  }

}

