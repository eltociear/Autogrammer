import { SupportedLanguage, } from "../types.js";
import Mustache from 'mustache';
// import type { Grammar } from 'contort';
import SQL_GRAMMAR from './sql.gbnf?raw' assert { type: 'text' };
import JSON_GRAMMAR from './json.gbnf?raw' assert { type: 'text' };
// import PYTHON_GRAMMAR from './python.gbnf?raw';
// import JAVASCRIPT_GRAMMAR from './javascript.gbnf?raw';

type Variables = Variables_SQL | object;

type Variables_SQL = {
  selectlist?: string[];
  tablename?: string[];
};

function isLanguage<L extends SupportedLanguage>(language: SupportedLanguage, testingLanguage: L): language is L {
  return language === testingLanguage;
}

function buildGrammar<L extends SupportedLanguage>(language: L, grammarTemplate: string, variables: L extends 'sql' ? Variables_SQL : object = {}) {
  if (isLanguage(language, 'sql')) {
    return Mustache.render(grammarTemplate, Object.entries(variables as Variables_SQL).reduce((obj, [key, value,]) => {
      if (value.length === 0) {
        return obj;
      }
      return {
        ...obj,
        [key]: value.map(v => JSON.stringify(v)).join(" | "),
      };
    }, {
      selectlist: 'string',
      tablename: 'string',
    }));
  }
  return grammarTemplate;
};

const GRAMMARS: Record<SupportedLanguage, string> = {
  sql: SQL_GRAMMAR as string,
  // javascript: JAVASCRIPT_GRAMMAR,
  // python: PYTHON_GRAMMAR,
  json: JSON_GRAMMAR as string,
};

export const getGrammar = (language: SupportedLanguage, variables: Variables = {}): string => buildGrammar(language, GRAMMARS[language], variables);
