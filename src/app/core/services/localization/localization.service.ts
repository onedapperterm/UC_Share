import { Injectable } from '@angular/core';
import { Params, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CORE_DEFAULT_LANGUAGE, CoreSettingsState, Language, SUPPORTED_LANGUAGES } from '../../settings/model/core-settings.model';
import { Store } from '@ngrx/store';
import { updateLanguageSettings } from '../../settings/store/settings.actions';
import { Observable } from 'rxjs';
import { selectCurrentLanguage } from '../../settings/store/settings.selectors';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(
    private _store: Store<CoreSettingsState>,
    private _router: Router,
    private _translateService: TranslateService,
  ) {
    this._translateService.setDefaultLang(CORE_DEFAULT_LANGUAGE);
  }

  public processUrlLenguageParams(params: Params, snapshot: RouterStateSnapshot): boolean | Promise<boolean> {

    const lang = params['lang'] || '';

    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      const storedLang = LocalStorageService.loadInitialCoreState().settings?.language || '';
      const language = SUPPORTED_LANGUAGES.includes(storedLang) ? storedLang : CORE_DEFAULT_LANGUAGE;
      const urlTree = this._router.createUrlTree(
        [snapshot.url],
        { queryParams: { ...params, lang: language } }
      );
      return this._router.navigateByUrl(urlTree);
    }

    if(this._translateService.currentLang != lang) {
      this._store.dispatch(updateLanguageSettings({language: lang}));
    }

    return true;
  }

  public updateLanguage(language: Language): void {
    this._store.dispatch(updateLanguageSettings({language: language}));
  }

  public getCurrentLanguage(): Language {
    return this._translateService.currentLang;
  }

  public getCurrentLanguage$(): Observable<Language> {
    return this._store.select(selectCurrentLanguage);
  }

  public translate(key: string | string[]): Observable<string> {
    return this._translateService.get(key);
  }


}
