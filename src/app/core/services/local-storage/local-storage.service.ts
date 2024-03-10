import { Injectable } from '@angular/core';
import { CoreState } from '../../store/core.state';
import { CoreRouterState } from '../../routing/store/core-router.state';
import { Router } from '@angular/router';
import { CoreSettingsState } from '../../settings/model/core-settings.model';
import { initialSettingsState } from '../../settings/store/settings.reducer';

const APP_PREFIX = 'UCS-';
const ROUTER_KEY = 'ROUTER';
const USER_SETTINGS_KEY = 'USER_SETTINGS';


/**
 * Injectable service for managing local storage operations.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private _router: Router,
  ) {}

  public setLatestRouteState(url?: string):void {
    let path = this._router.parseUrl(url || '/dash');
    delete path.queryParams['lang'];
    let state: CoreRouterState = {url: path.toString()};
    this.setItem(ROUTER_KEY, state);
  }

  public getRedirectUrl(): string{
    const item = LocalStorageService.getItem(ROUTER_KEY) as CoreRouterState;
    return item?.url || '/home';
  }

  public setUserSettingsState(state: CoreSettingsState): void {
    this.setItem(USER_SETTINGS_KEY, state)
  }

  /**
   * Load initial core state.
   * @returns {CoreState} - The initial core state.
   * @public
   */
  public static loadInitialCoreState(): CoreState {
    return {
      settings: LocalStorageService.getItem(USER_SETTINGS_KEY) as CoreSettingsState || initialSettingsState,
     };
  }

  /**
   * Get an item from local storage.
   * @param {string} key - The key of the item to retrieve.
   * @returns {object | null} - The retrieved item or null if not found.
   * @public
   */
  public static getItem(key: string): object | null {
    let storedItem = localStorage.getItem(`${APP_PREFIX}${key}`);
    if(storedItem) {
      const item = JSON.parse(storedItem);
      return item || {};
    } else {
      return null;
    }
  }

  /**
   * Remove an item from local storage.
   * @param {string} key - The key of the item to remove.
   * @returns {void}
   * @public
   */
  public removeItem(key: string):void {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  /**
   * Set an item in local storage.
   * @param {string} key - The key under which to store the item.
   * @param {any} value - The value to store.
   * @returns {void}
   * @public
   */
  public setItem(key: string, value: any):void {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

}
