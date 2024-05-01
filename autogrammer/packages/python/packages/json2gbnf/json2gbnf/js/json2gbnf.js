import { VALUE_KEY, } from './constants/grammar-keys.js';
import { Grammar, } from './grammar.js';
import { isEmptyObject, hasDollarSchemaProp, } from './type-guards.js';
import { parse, } from './utils/parse.js';
// https://json-schema.org/understanding-json-schema/basics
// false will always be invalid
export const BLANK_GRAMMAR = `root ::= ""`;
export function JSON2GBNF(
// eslint-disable-next-line @typescript-eslint/ban-types
schema, opts) {
    if (schema === null || schema === undefined) {
        throw new Error('Bad schema provided');
    }
    if (schema === false) {
        return BLANK_GRAMMAR;
    }
    if (schema !== true && hasDollarSchemaProp(schema) && schema['$schema'] !== 'https://json-schema.org/draft/2020-12/schema') {
        throw new Error(`Unsupported schema version: ${schema['$schema']}`);
    }
    const parser = new Grammar(opts);
    if (schema === true || isEmptyObject(schema)) {
        parser.addRule(VALUE_KEY, 'root');
    }
    else {
        parse(parser, schema, 'root');
    }
    return parser.grammar;
}
;
//# sourceMappingURL=json2gbnf.js.map