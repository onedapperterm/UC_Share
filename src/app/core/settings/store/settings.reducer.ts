import { Action, createReducer, on } from "@ngrx/store";
import { CoreSettingsState, Language, Theme } from "../model/core-settings.model";
import { updateLanguageSettings, updateThemeSettings } from "./settings.actions";

export const initialSettingsState: CoreSettingsState = {
  language: 'es',
  theme: 'light'
}

const _settingsReducer = createReducer(
  initialSettingsState,
  on(updateLanguageSettings, (state: CoreSettingsState, props: {language: Language}) => {
    return {
      ...state,
      language: props.language
    }
  }),
  on(updateThemeSettings, (state: CoreSettingsState, props: {theme: Theme}) => {
    return {
      ...state,
      theme: props.theme
    }
  }),
);

export function settingsReducer(state: CoreSettingsState | undefined, action: Action):CoreSettingsState {
  return _settingsReducer(state, action);
}
