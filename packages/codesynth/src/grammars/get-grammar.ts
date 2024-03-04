import { SupportedLanguage } from "../types.js";
// import type { Grammar } from 'contortionist';
import SQL_GRAMMAR from './sql.gbnf?raw';
import JSON_GRAMMAR from './json.gbnf?raw';
import PYTHON_GRAMMAR from './python.gbnf?raw';
import JAVASCRIPT_GRAMMAR from './javascript.gbnf?raw';

const GRAMMARS: Record<SupportedLanguage, string> = {
  sql: SQL_GRAMMAR,
  javascript: JAVASCRIPT_GRAMMAR,
  python: PYTHON_GRAMMAR,
  json: JSON_GRAMMAR,
};

export const getGrammar = (language: SupportedLanguage): string => GRAMMARS[language];
