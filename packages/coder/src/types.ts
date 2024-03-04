import { Tensor } from "@xenova/transformers";

export interface GenerationOutput {
  input_ids: Tensor;
  attention_mask: any;
}

export type OutputTokenIds = number[][];
