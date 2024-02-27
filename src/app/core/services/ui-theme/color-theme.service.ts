import { Injectable, } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreSettingsState } from '../../settings/model/core-settings.model';
import { updateThemeSettings } from '../../settings/store/settings.actions';
import { Observable, } from 'rxjs';
import { selectCurrentTheme } from '../../settings/store/settings.selectors';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {

  constructor(private _store: Store<CoreSettingsState>) {}

  public setTheme(theme: string): void {
    this._store.dispatch(updateThemeSettings({theme: theme}));
  }

  public currentTheme(): Observable<string> {
    return this._store.select(selectCurrentTheme);
  }

}

