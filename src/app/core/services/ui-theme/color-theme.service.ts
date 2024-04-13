import { Injectable, } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreSettingsState, Theme } from '../../settings/model/core-settings.model';
import { updateThemeSettings } from '../../settings/store/settings.actions';
import { Observable, } from 'rxjs';
import { selectCurrentTheme } from '../../settings/store/settings.selectors';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {

  constructor(private _store: Store<CoreSettingsState>) {}

  public setTheme(theme: Theme): void {
    this._store.dispatch(updateThemeSettings({theme: theme}));
  }

  public currentTheme(): Observable<Theme> {
    return this._store.select(selectCurrentTheme);
  }

}

