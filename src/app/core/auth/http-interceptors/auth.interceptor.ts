import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../store/auth.selectors';

/**
 * Service responsible for intercepting HTTP requests to add an access token if available.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _store: Store) {}

  /**
   * Intercepts the HTTP request and handles it accordingly.
   * @param {HttpRequest<unknown>} request - The HTTP request.
   * @param {HttpHandler} next - The HTTP handler.
   * @returns {Observable<HttpEvent<unknown>>} An Observable of the HTTP event.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.handleRequest(request).pipe(
      switchMap(clonedRequest => next.handle(clonedRequest)),
    );
  }

  /**
   * Handles the HTTP request by adding the access token if available.
   * @param {HttpRequest<unknown>} request - The HTTP request.
   * @returns {Observable<HttpRequest<unknown>>} An Observable of the modified HTTP request
   * if the token is valid or the original request if not.
   */
  private handleRequest(request: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
    return this._store.select(selectAccessToken).pipe(
        map(accessToken => accessToken ? this.addToken(accessToken, request) : request ),
      );
  }

  /**
   * Adds the access token to the request headers.
   * @param {string} accessToken - The access token.
   * @param {HttpRequest<unknown>} request - The HTTP request.
   * @returns {HttpRequest<unknown>} The modified HTTP request.
   */
  private addToken(accessToken: string, request: HttpRequest<unknown>): HttpRequest<unknown> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
    });
  }
}
