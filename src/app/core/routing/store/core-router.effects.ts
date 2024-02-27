import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { filter, tap, withLatestFrom } from "rxjs";
import { selectIsLogged } from "../../auth/store/auth.selectors";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";

@Injectable()
export class CoreRouterEffects {

  constructor(
    private _actions$: Actions,
    private _store: Store,
    private _localStorageService: LocalStorageService,
  ) {}

  public saveLastRoue$ = createEffect(
    () => this._actions$.pipe(
      ofType(routerNavigatedAction),
      withLatestFrom(this._store.select(selectIsLogged)),
      filter(([navigation, isLogged]) => !navigation.payload.routerState.url.includes('login') && isLogged),
      tap(([navigation, _]) => this._localStorageService.setLatestRouteState(navigation.payload.routerState.url))
    ),
    { dispatch: false }
  );
}
