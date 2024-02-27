import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreSettingsState, Language } from "../model/core-settings.model";

export const selectCoreSettingsState = createFeatureSelector<CoreSettingsState>('settings');

export const selectCurrentLanguage = createSelector(
  selectCoreSettingsState,
  (state: CoreSettingsState): Language => state.language,
);

export const selectCurrentTheme = createSelector(
  selectCoreSettingsState,
  (state: CoreSettingsState): string => state.theme,
);

