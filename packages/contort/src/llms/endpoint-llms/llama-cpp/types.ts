import { Callback, InternalExecuteOptions, } from "../../../types.js";
export interface LlamaCPPExecuteOptions<S extends boolean> extends InternalExecuteOptions {
  prompt: LlamaCPPPrompt;
  callback?: Callback<'llama.cpp', S>;
}

export type LlamaCPPPrompt = string;

export interface LlamaCPPCallOpts {
  n_predict?: number;
  prompt: string;
  grammar: string;
  stream: boolean;
}

export interface LlamaCPPResponse {
  content: string
  generation_settings: {
    "dynatemp_exponent": number;
    "dynatemp_range": number;
    "frequency_penalty": number;
    "grammar": string;
    "ignore_eos": boolean;
    "logit_bias": number[];
    "min_keep": number;
    "min_p": number;
    "mirostat": number;
    "mirostat_eta": number;
    "mirostat_tau": number;
    "model": string;
    "n_ctx": number;
    "n_keep": number;
    "n_predict": number;
    "n_probs": number;
    "penalize_nl": boolean;
    "penalty_prompt_tokens": string[];
    "presence_penalty": number;
    "repeat_last_n": number;
    "repeat_penalty": number;
    "samplers": string[];
    "seed": number[];
    "stop": string[];
    "stream": boolean;
    "temperature": number;
    "tfs_z": number;
    "top_k": number;
    "top_p": number;
    "typical_p": number;
    "use_penalty_prompt_tokens": boolean;
  },
  "id_slot": number;
  "model": string;
  "prompt": string;
  "stop": boolean;
  "stopped_eos": boolean;
  "stopped_limit": boolean;
  "stopped_word": boolean;
  "stopping_word": string;
  "timings": {
    "predicted_ms": number;
    "predicted_n": number;
    "predicted_per_second": number;
    "predicted_per_token_ms": number;
    "prompt_ms": number;
    "prompt_n": number;
    "prompt_per_second": number;
    "prompt_per_token_ms": number;
  },
  "tokens_cached": number;
  "tokens_evaluated": number;
  "tokens_predicted": number;
  "truncated": boolean;
}

export interface LlamaCPPError {
  code: number;
  message: string;
  type: string;
}
