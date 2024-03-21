import { ModelDefinition } from "contortionist";

export type SupportedLanguage =
  // 'sql' | 
  // 'python' | 
  // 'javascript' | 
  'json';
export const SUPPORTED_LANGUAGES = [
  // 'sql', 
  // 'python', 
  // 'javascript', 
  'json',
];

export const isSupportedLanguage = (language: string): language is SupportedLanguage => SUPPORTED_LANGUAGES.includes(language);

export interface ConstructorOptions {
  language: SupportedLanguage;
  model: ModelDefinition;
}
