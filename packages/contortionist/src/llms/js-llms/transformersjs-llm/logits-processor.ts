import { Tensor } from "@xenova/transformers";
import { Tokenizer } from "./tokenizer.js";
import { OutputTokenIds, StreamCallback } from "../../../types.js";

export class LogitsProcessor<R> {
  tokenizer: Tokenizer;
  streamCallback?: StreamCallback<R>;
  constructor(tokenizer: Tokenizer, streamCallback?: StreamCallback<R>) {
    this.tokenizer = tokenizer;
    this.streamCallback = streamCallback;
  }

  getAllowedToken = (word: string) => {
    const { input_ids: { dims: [b, n], data } } = this.tokenizer.encode(word);
    if (n > 1) {
      throw new Error(`token.length is ${n} for word ${word}`);
    }

    return data[0];
  }
  processors = [(input_tokens: OutputTokenIds, logits: Tensor) => {
    const originalValues: Record<number, number> = [0, 1, 2].reduce<Record<number, number>>((obj, word) => {
      const tokenId = typeof word !== 'number' ? this.getAllowedToken(word) : word;
      return {
        ...obj,
        [tokenId]: logits.data[tokenId],
      };
    }, {});
    (logits.data as any).fill(-Infinity);
    Object.entries(originalValues).forEach(([token_id, value]) => {
      logits.data[parseInt(token_id, 10)] = value;
    });
    if (this.streamCallback) {
      this.streamCallback({
        partial: this.tokenizer.decode(input_tokens)[0],
        chunk: {
          input_tokens,
          logits,
        },
      })
    }
    return logits;
  }];

  [Symbol.iterator]() {
    return this.processors.values();
  }
}
