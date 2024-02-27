import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { selectIsLogged } from '../store/auth.selectors';

/**
 * Guard function to prevent access to a route if the user is already logged in.
 * @returns {Observable<boolean>} An Observable<boolean> indicating whether the user is not logged in.
 */
export const loginGuard: CanActivateFn = (): Observable<boolean>=> {
  const _router: Router = inject(Router);
  const _store: Store = inject(Store<'auth'>);

  return _store.select(selectIsLogged).pipe(
    map(isLogged => !isLogged),
    tap(isNotLogged => isNotLogged ? void null : _router.navigateByUrl('/dash')),
  );
};
