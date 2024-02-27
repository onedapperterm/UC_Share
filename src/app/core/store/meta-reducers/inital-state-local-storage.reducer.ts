import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { CoreState } from '../core.state';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';


/**
 * Initialize core state from local storage.
 * @param {ActionReducer<CoreState>} reducer - The core state reducer.
 * @returns {ActionReducer<CoreState>} - The updated core state reducer.
 */
export function initCoreStateFromLocalStorage(reducer: ActionReducer<CoreState>): ActionReducer<CoreState> {
  return function (state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialCoreState() };
    }
    return newState;
  };
}
