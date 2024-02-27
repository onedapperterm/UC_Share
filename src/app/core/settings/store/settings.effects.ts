import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom, } from 'rxjs';
import * as SettingsActions from './settings.actions';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CoreSettingsState, Language } from '../model/core-settings.model';
import { DOCUMENT, Location } from '@angular/common';
import { selectCoreSettingsState } from './settings.selectors';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Injectable()
export class CoreSettingEffects {

  constructor(
    private _router: Router,
    private _actions$: Actions,
    private _location: Location,
    private _store: Store<CoreSettingsState>,
    private _translateService: TranslateService,
    private _localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private _document: Document,
  ) {}

  public updateLanguageSettings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SettingsActions.updateLanguageSettings),
      tap((action) => this.setLanguage(action.language))
    ),
    { dispatch: false }
  );


  public updateThemeSettings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SettingsActions.updateThemeSettings),
      tap((action) => this.setTheme(action.theme)),
    ),
    { dispatch: false }
  );

  public persistSettings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SettingsActions.updateThemeSettings, SettingsActions.updateLanguageSettings),
      withLatestFrom(this._store.select(selectCoreSettingsState)),
      tap(([_, settings]) => this._localStorageService.setUserSettingsState(settings)),
    ),
    { dispatch: false }
  )

  //------HELPER FUNCTIONS:

  private setLanguage(language: Language): void {
    this._translateService.use(language);
    let path = this._router.parseUrl(this._location.path());
    path.queryParams['lang'] = language;
    this._location.go(path.toString());
  }

  private setTheme(theme: string): void {
    const classList = this._document.body.classList;
    const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (toRemove.length) {
      this._document.body.classList.remove(...toRemove);
    }
    this._document.body.classList.add(theme + '-theme');

  }

}
