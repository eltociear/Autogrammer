import { SupportedLanguage } from "../types.js";
import Mustache from 'mustache';
// import type { Grammar } from 'contortionist';
import SQL_GRAMMAR from './sql.gbnf?raw';
import JSON_GRAMMAR from './json.gbnf?raw';
import PYTHON_GRAMMAR from './python.gbnf?raw';
import JAVASCRIPT_GRAMMAR from './javascript.gbnf?raw';

type Variables = Variables_SQL | {};

type Variables_SQL = {
  selectlist?: string[];
  tablename?: string[];
};

function buildGrammar<L extends SupportedLanguage>(_language: L, grammarTemplate: string, variables: L extends 'sql' ? Variables_SQL : {}) {
  if (_language === 'sql') {
    return Mustache.render(grammarTemplate, Object.entries(variables).reduce((obj, [key, value]) => {
      if (value.length === 0) {
        return obj;
      }
      return {
        ...obj,
        [key]: value.map(v => JSON.stringify(v)).join(" | "),
      }
    }, {
      selectlist: 'string',
      tablename: 'string',
    }));
  }
  return grammarTemplate;
};

const GRAMMARS: Record<SupportedLanguage, string> = {
  sql: SQL_GRAMMAR,
  javascript: JAVASCRIPT_GRAMMAR,
  python: PYTHON_GRAMMAR,
  json: JSON_GRAMMAR,
};

export const getGrammar = (language: SupportedLanguage, variables: Variables = {}): string => buildGrammar(language, GRAMMARS[language], variables);
