export const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'es'];

export type Language = typeof SUPPORTED_LANGUAGES[number];
export type Theme = 'light' | 'dark';

export const CORE_DEFAULT_LANGUAGE: Language = 'en';

export interface CoreSettingsState {
  language: Language;
  theme: Theme;
}

export interface LanguageSelect {
  value: Language
  label: String
}

