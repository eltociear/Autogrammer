import { INTEGER_KEY, NUMBER_KEY, } from "../constants/grammar-keys.js";
const UNSUPPORTED_NUMERIC_PROPERTIES = [
    'exclusiveMinimum',
    'exclusiveMaximum',
    'multipleOf',
    'minimum',
    'maximum',
];
export const parseNumber = (schema) => {
    for (const key of UNSUPPORTED_NUMERIC_PROPERTIES) {
        if (schema[key] !== undefined) {
            throw new Error(`${key} is not supported`);
        }
    }
    const { type, } = schema;
    if (type === 'number') {
        return NUMBER_KEY;
    }
    else {
        return INTEGER_KEY;
    }
};
//# sourceMappingURL=parse-number.js.map