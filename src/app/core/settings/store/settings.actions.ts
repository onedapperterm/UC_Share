import { createAction, props } from '@ngrx/store';
import { Language, Theme } from '../model/core-settings.model';

export const updateLanguageSettings = createAction(
  '[Settings] Update language settings',
  props<{language: Language}>()
);

export const updateThemeSettings = createAction(
  '[Settings] Update Theme settings',
  props<{theme: Theme}>()
);

