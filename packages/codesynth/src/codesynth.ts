import Contortionist, { ExternalExecuteOptions } from 'contortionist';
import { getGrammar } from './grammars/index.js';
import { ConstructorOptions, SUPPORTED_LANGUAGES, SupportedLanguage, isSupportedLanguage } from './types.js';
import { buildPrompt, parseOptions } from './utils.js';

export class CodeSynth {
  language: SupportedLanguage;
  contortionist: Contortionist<any>;

  /**
   * @hidden
  */
  _abortController = new AbortController();

  /**
   * Instantiates an instance of CodeSynth.
   * 
   * ```javascript
   * import CodeSynth from 'codesynth';
   * 
   * const synth = new CodeSynth({
   *   language: 'javascript',
   *   model: {},
   * });
   * ```
   * 
   * @returns an instance of a CodeSynth class.
   */
  constructor({ language, model }: ConstructorOptions) {
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
    const builtPrompt = buildPrompt(prompt, this.language);
    const parsedOptions = parseOptions(options);
    return this.contortionist.execute(builtPrompt, parsedOptions,
      //   {
      //   // signal: this._abortController.signal,
      // }
    );
  };

  abort = () => {
    console.log('abort!')
    this.contortionist.abort();
  }
}

