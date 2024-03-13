// import { LLM } from "./llm";
// import GPTTokenizer_cl100k_base, {
//   EndOfPrompt,
//   EndOfText,
//   FimMiddle,
//   FimPrefix,
//   FimSuffix,
//   ImStart,
//   ImEnd,
//   ImSep,
// } from "gpt-tokenizer";
// const { encode, decode } = GPTTokenizer_cl100k_base;

// // for (let i = 0; i < 10000000; i++) {
// //   try {
// //     const decoded = decode([i]);
// //     if (decoded === '<|endofprompt|>') {
// //       console.log('found it', i)
// //       break;
// //     }
// //   } catch (err) {
// //     throw new Error(`${i}`)
// //   }
// // }
// // console.log('all done')

// export class Tokenizer {
//   tokenizerArgs: any;
//   // stopToken: Promise<string>;
//   // generator: TextGenerationPipeline;
//   constructor(llm: LLM) {
//     // this.generator = generator;
//     // const add_special_tokens = shouldAddSpecialTokens;
//     // this.tokenizerArgs = {
//     //   add_special_tokens,
//     //   padding: true,
//     //   truncation: true,
//     // };

//     // this.generator.tokenizer.padding_side = 'left';
//     // this.stopToken = agenerator.then(generator => generator.tokenizer.special_tokens[0]);
//   }

//   vocab: string[] = Array.from({ length: 100276 }, (_, i) => decode([i])[0]);

//   encode = (prompt: string) => {
//     const allowedSpecial = new Set([EndOfPrompt,
//       EndOfText,
//       FimMiddle,
//       FimPrefix,
//       FimSuffix,
//       ImStart,
//       ImEnd,
//       ImSep,
//     ]);
//     return encode(prompt, { allowedSpecial });
//     //   const tokenizerArgs = {
//     //     add_special_tokens: shouldAddSpecialTokens,
//     //     padding: true,
//     //     truncation: true,
//     //   };

//     //   return this.generator.tokenizer(prompt, tokenizerArgs);
//   }

//   // // decode (outputTokenIds: number): string
//   decode = (outputTokenIds: number) => {
//     return decode([outputTokenIds]);
//   }
//   //   if (typeof outputTokenIds === 'number') {
//   //     return this.generator.tokenizer.decode([outputTokenIds], {
//   //       skip_special_tokens: true,
//   //     });
//   //   }
//   //   return this.generator.tokenizer.batch_decode(outputTokenIds, {
//   //     skip_special_tokens: true,
//   //   });
//   // };

//   get stopToken(): string {
//     return '<|endofprompt|>';
//     // return this.generator.tokenizer.special_tokens[0];
//   }
//   get stopTokenID(): number {
//     return encode(this.stopToken)[0];
//   }
// }

import { pipeline, env, TextGenerationConfig, PreTrainedTokenizer, TextGenerationPipeline, Tensor } from '@xenova/transformers';
import { GenerationOutput, OutputTokenIds } from './types.js';
export class Tokenizer {
  tokenizerArgs: any;
  // stopToken: Promise<string>;
  generator: TextGenerationPipeline;
  constructor(generator: TextGenerationPipeline, shouldAddSpecialTokens: boolean = false) {
    this.generator = generator;
    const add_special_tokens = shouldAddSpecialTokens;
    this.tokenizerArgs = {
      add_special_tokens,
      padding: true,
      truncation: true,
    };

    this.generator.tokenizer.padding_side = 'left';
    // this.stopToken = agenerator.then(generator => generator.tokenizer.special_tokens[0]);
  }

  get vocab() {
    return this.generator.tokenizer.model.vocab;
  }

  encode = (prompt: string, shouldAddSpecialTokens = false): GenerationOutput => {
    const tokenizerArgs = {
      add_special_tokens: shouldAddSpecialTokens,
      padding: true,
      truncation: true,
    };

    return this.generator.tokenizer(prompt, tokenizerArgs);
  }

  // decode (outputTokenIds: number): string
  decode = (outputTokenIds: number | OutputTokenIds) => {
    if (typeof outputTokenIds === 'number') {
      return this.generator.tokenizer.decode([outputTokenIds], {
        skip_special_tokens: true,
      });
    }
    return this.generator.tokenizer.batch_decode(outputTokenIds, {
      skip_special_tokens: true,
    });
  };

  get stopToken(): string {
    return this.generator.tokenizer.special_tokens[0];
  }
}
