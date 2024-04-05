import Contortionist, { ExternalExecuteOptions, } from 'contort';
import { getGrammar, } from './grammars/index.js';
import { ConstructorOptions, SUPPORTED_LANGUAGES, SupportedLanguage, isSupportedLanguage, } from './types.js';
import { buildPrompt, parseOptions, } from './utils.js';
import { Variables, } from './grammars/get-grammar.js';

export class CodeSynth<L extends SupportedLanguage> {
  language: L;
  contortionist: Contortionist<undefined>;

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
  constructor({ language, model, }: ConstructorOptions<L>) {
    if (!isSupportedLanguage(language)) {
      throw new Error(`Unsupported language: ${language as string}. Only one of ${JSON.stringify(SUPPORTED_LANGUAGES)} are supported.`);
    }
    this.language = language;
    this.contortionist = new Contortionist({
      model,
      grammar: getGrammar<L>(language),
    });
  }

  public async synthesize(
    prompt: string,
    options: ExternalExecuteOptions<undefined, boolean>
  ): Promise<string>;
  public async synthesize(
    prompt: string,
    languageOptions: string | Variables<SupportedLanguage>,
    options: ExternalExecuteOptions<undefined, boolean>
  ): Promise<string>;
  public async synthesize(
    prompt: string,
    _languageOptions: string | ExternalExecuteOptions<undefined, boolean>,
    _options?: ExternalExecuteOptions<undefined, boolean>,
  ): Promise<string> {
    const { options, languageOptions, } = divideOptions(_languageOptions, _options);
    if (languageOptions !== undefined) {
      if (this.language === 'sql') {
        this.contortionist.grammar = getGrammar<'sql'>(this.language, languageOptions);
        // console.log(this.contortionist.grammar);
        // } else if (this.language === 'json') {
        //   const grammar = await compile(languageOptions, 'Root');
        //   console.log(grammar);
        //   this.contortionist.grammar = grammar;
      } else {
        throw new Error('I dont know this one');
      }
    }
    const builtPrompt = buildPrompt(prompt, this.language);
    const parsedOptions = parseOptions(options);
    return await this.contortionist.execute(builtPrompt, parsedOptions,
      //   {
      //   // signal: this._abortController.signal,
      // }
    ) as unknown as string;
  };

  abort = () => {
    console.log('abort!');
    this.contortionist.abort();
  };
}


const divideOptions = (
  languageOptions: string | ExternalExecuteOptions<undefined, boolean>,
  options?: ExternalExecuteOptions<undefined, boolean>,
): {
  languageOptions?: Variables<SupportedLanguage>,
  options: ExternalExecuteOptions<undefined, boolean>,
} => {
  if (options !== undefined) {
    return {
      languageOptions,
      options,
    };
  }

  return {
    languageOptions: undefined,
    options: languageOptions as ExternalExecuteOptions<undefined, boolean>,
  };
};
