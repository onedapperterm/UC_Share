import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreSettingsState, Language, Theme } from "../model/core-settings.model";

export const selectCoreSettingsState = createFeatureSelector<CoreSettingsState>('settings');

export const selectCurrentLanguage = createSelector(
  selectCoreSettingsState,
  (state: CoreSettingsState): Language => state.language,
);

export const selectCurrentTheme = createSelector(
  selectCoreSettingsState,
  (state: CoreSettingsState): Theme => state.theme,
);

