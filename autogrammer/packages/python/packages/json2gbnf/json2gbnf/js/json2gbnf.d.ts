import { type JSONSchema, type SchemaOpts } from './types.js';
export declare const BLANK_GRAMMAR = "root ::= \"\"";
export declare function JSON2GBNF<T extends JSONSchema>(schema?: {} | null | T | boolean, opts?: SchemaOpts): string;
