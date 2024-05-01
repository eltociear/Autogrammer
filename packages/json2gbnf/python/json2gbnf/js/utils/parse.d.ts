import { type Grammar } from "../grammar.js";
import type { JSONSchema } from "../types.js";
export declare const parse: (parser: Grammar, schema: JSONSchema, symbolName: string) => void;
