import { LLM } from "./llm.js";
import { LogitsProcessor } from "./logits-processor.js";
import { DumbParser } from "./parsers/dumb-parser.js";
import { Tokenizer } from "./tokenizer.js";
import { AbstractParser, getParser } from "./parsers/index.js";
import { ParserKey } from "./parsers/get-parser.js";

interface Options {
  language?: string;
  model?: string;
  parser?: ParserKey;
}

export class Coder {
  language?: string;
  objects: Promise<{
    llm: LLM;
    tokenizer: Tokenizer;
    parser: AbstractParser;
  }>;

  constructor({ language, model, parser }: Options) {
    this.language = language;

    this.objects = this.initialize(model, parser);
  }

  initialize = async (model: string, parserKey?: ParserKey) => {
    const llm = new LLM(model);
    const pipeline = await llm.apipeline;
    // const tokenizer = new Tokenizer(llm);
    const tokenizer = new Tokenizer(pipeline);
    const parser = getParser(tokenizer, parserKey);
    new DumbParser(tokenizer);

    return {
      llm,
      tokenizer,
      parser,
    };
  }

  execute = async (prompt: string, { maxTokens = 1 }: { maxTokens?: number } = {}) => {
    console.log(`execute: ${prompt}`);
    const {
      llm,
      tokenizer,
      parser,
    } = await this.objects;
    const logitsProcessor = new LogitsProcessor(tokenizer, parser);
    let partialCompletion = '';
    let promptAndPartialCompletion = `${prompt}${partialCompletion}`;
    for (let i = 0; i < maxTokens; i++) {
      // console.log('i', i, 'out of', maxTokens);
      let start = performance.now();
      await parser.nextLex({
        prompt,
        partialCompletion,
      });
      console.log('next lex', performance.now() - start);
      start = performance.now();
      if (!parser.shouldContinue) {
        console.log(`do not continue, processed ${i} tokens`)
        break;
      }
      console.log('should continue', performance.now() - start);

      // console.log(`promptAndPartialCompletion: ${promptAndPartialCompletion}`)
      start = performance.now();
      const { input_ids, attention_mask } = await tokenizer.encode(promptAndPartialCompletion);
      console.log('tokenizer encode', performance.now() - start);
      if (input_ids.size === 0) {
        throw new Error(`Got empty input_ids for "${promptAndPartialCompletion}"`);
      }

      // partialCompletion = await llm.generateText(promptAndPartialCompletion, logitsProcessor);
      start = performance.now();
      const outputTokenIds = await llm.generateText({ input_ids, attention_mask }, {}, logitsProcessor);
      console.log('generate text', performance.now() - start);
      start = performance.now();
      const decoded = tokenizer.decode(outputTokenIds);
      console.log('tokenizer decode', performance.now() - start);
      // console.log(`decoded: ${decoded}`)
      partialCompletion = decoded[0].slice(prompt.length);
      console.log(`partialCompletion: ${partialCompletion}`)
      promptAndPartialCompletion = `${prompt}${partialCompletion}`;
      // promptAndPartialCompletion += partialCompletion;
      // `${prompt}${partialCompletion}`;
      // console.log(`promptAndPartialCompletion: ${promptAndPartialCompletion}`)
    }
    console.log('returning', promptAndPartialCompletion)
    return promptAndPartialCompletion;
  }
}
