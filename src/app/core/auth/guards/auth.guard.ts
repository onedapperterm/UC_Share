import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { selectIsLogged } from '../store/auth.selectors'
import { Observable, tap } from 'rxjs'

/**
 * Guard function to prevent access to a route if the user is not logged in.
 * @returns {Observable<boolean>} An Observable<boolean> indicating whether the user is logged in.
 */
export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const _router: Router = inject(Router)
  const _store: Store = inject(Store<'auth'>)

  return _store
    .select(selectIsLogged)
    .pipe(
      tap((isLogged) => (isLogged ? void null : _router.navigate(['/login'])))
    )
}
