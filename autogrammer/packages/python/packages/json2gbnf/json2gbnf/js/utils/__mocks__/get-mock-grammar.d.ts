import { AddRule, GetConst } from '../../types.js';
import { type Grammar } from '../../grammar.js';
export declare const getMockGrammar: ({ getConst, addRule, fixedOrder, }?: {
    getConst?: GetConst;
    fixedOrder?: boolean;
    addRule?: AddRule;
}) => Grammar;
