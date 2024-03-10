import { ActionReducerMap, MetaReducer, } from "@ngrx/store";
import { AuthState } from "../auth/model/auth.model";
import { AuthEffects } from "../auth/store/auth.effects";
import { authReducer } from "../auth/store/auth.reducer";
import { initCoreStateFromLocalStorage } from "./meta-reducers/inital-state-local-storage.reducer";
import { routerReducer } from "@ngrx/router-store";
import { CoreRouterState, } from "../routing/store/core-router.state";
import { CoreRouterEffects } from "../routing/store/core-router.effects";
import { CoreSettingsState } from "../settings/model/core-settings.model";
import { settingsReducer } from "../settings/store/settings.reducer";
import { CoreSettingEffects } from "../settings/store/settings.effects";

export interface CoreState {
  auth?: AuthState;
  router?: CoreRouterState;
  settings?: CoreSettingsState;
}

export const coreReducers: ActionReducerMap<CoreState> = {
  auth: authReducer,
  router: routerReducer,
  settings: settingsReducer,
};

export const metaReducers: MetaReducer<CoreState>[] = [
  initCoreStateFromLocalStorage,
];

export const coreEffects = [
  AuthEffects,
  CoreRouterEffects,
  CoreSettingEffects
]
