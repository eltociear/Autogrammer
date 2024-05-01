import type { AddRule, GetConst, SchemaOpts } from './types.js';
export declare class Grammar {
    #private;
    fixedOrder: boolean;
    whitespace: number;
    constructor({ whitespace, fixedOrder, }?: SchemaOpts);
    getConst: GetConst;
    addRule: AddRule;
    get grammar(): string;
}
