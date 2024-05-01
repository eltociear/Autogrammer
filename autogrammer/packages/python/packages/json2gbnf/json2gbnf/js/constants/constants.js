import { objectDef, arrayDef, stringDef, numberDef, boolDef, nullDef, charDef, integerDef, whitespaceDef, whitespaceRepeatingDef, } from './grammar-definitions.js';
import { VALUE_KEY, OBJECT_KEY, ARRAY_KEY, STRING_KEY, NUMBER_KEY, BOOLEAN_KEY, NULL_KEY, CHAR_KEY, INTEGER_KEY, COMMA_KEY, COLON_KEY, QUOTE_KEY, LEFT_BRACKET_KEY, RIGHT_BRACKET_KEY, LEFT_BRACE_KEY, RIGHT_BRACE_KEY, WHITESPACE_KEY, WHITESPACE_REPEATING_KEY, } from './grammar-keys.js';
export const JSON_ALL_VALID_VALUES = `${OBJECT_KEY} | ${ARRAY_KEY} | ${STRING_KEY} | ${NUMBER_KEY} | ${BOOLEAN_KEY} | ${NULL_KEY}`;
export const GLOBAL_CONSTANTS = [
    `${VALUE_KEY} ::= ${JSON_ALL_VALID_VALUES}`,
    `${OBJECT_KEY} ::= ${objectDef}`,
    `${ARRAY_KEY} ::= ${arrayDef}`,
    `${STRING_KEY} ::= ${stringDef}`,
    `${NUMBER_KEY} ::= ${numberDef}`,
    `${BOOLEAN_KEY} ::= ${boolDef}`,
    `${NULL_KEY} ::= ${nullDef}`,
    `${CHAR_KEY} ::= ${charDef}`,
    `${INTEGER_KEY} ::= ${integerDef}`,
    `${COMMA_KEY} ::= ","`,
    `${COLON_KEY} ::= ":"`,
    `${QUOTE_KEY} ::= "\\""`,
    `${LEFT_BRACKET_KEY} ::= "["`,
    `${RIGHT_BRACKET_KEY} ::= "]"`,
    `${LEFT_BRACE_KEY} ::= "{"`,
    `${RIGHT_BRACE_KEY} ::= "}"`,
    `${WHITESPACE_KEY} ::= ${whitespaceDef}`,
    `${WHITESPACE_REPEATING_KEY} ::= ${whitespaceRepeatingDef}`,
];
//# sourceMappingURL=constants.js.map