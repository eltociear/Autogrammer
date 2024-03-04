import Contortionist, { ModelDefinition, ExternalExecuteOptions } from 'contortionist';
import { getGrammar } from './grammars/index.js';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from './types.js';

interface Options {
  language: SupportedLanguage;
  model: ModelDefinition;
}

export class CodeSynth {
  language: SupportedLanguage;
  contortionist: Contortionist<any>;

  constructor({ language, model }: Options) {
    if (!isSupportedLanguage(language)) {
      throw new Error(`Unsupported language: ${language}. Only one of ${JSON.stringify(SUPPORTED_LANGUAGES)} are supported.`);
    }
    this.language = language;
    this.contortionist = new Contortionist({
      model,
      grammar: getGrammar(language),
    });
  }

  synthesize = (prompt: string, options: ExternalExecuteOptions<any>) => {
    return this.contortionist.execute(buildPrompt(prompt, this.language), parseOptions(options));
  };
}

const isSupportedLanguage = (language: string): language is SupportedLanguage => SUPPORTED_LANGUAGES.includes(language);

const parseOptions = (options: ExternalExecuteOptions<any>) => {
  return {
    ...options,
  }
};

const buildPrompt = (prompt: string, language: SupportedLanguage) => {
  return `
  You are a very helpful codebot. Do your best to answer the user's query using only the language "${language}".

  ${prompt}
  `.trim();
};
