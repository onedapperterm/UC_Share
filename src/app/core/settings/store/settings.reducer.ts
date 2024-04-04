import { Action, createReducer, on } from "@ngrx/store";
import { CoreSettingsState, Language } from "../model/core-settings.model";
import { updateLanguageSettings, updateThemeSettings } from "./settings.actions";

export const initialSettingsState: CoreSettingsState = {
  language: 'en',
  theme: 'dark'
}

const _settingsReducer = createReducer(
  initialSettingsState,
  on(updateLanguageSettings, (state: CoreSettingsState, props: {language: Language}) => {
    return {
      ...state,
      language: props.language
    }
  }),
  on(updateThemeSettings, (state: CoreSettingsState, props: {theme: string}) => {
    return {
      ...state,
      theme: props.theme
    }
  }),
);

export function settingsReducer(state: CoreSettingsState | undefined, action: Action):CoreSettingsState {
  return _settingsReducer(state, action);
}
