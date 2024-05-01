import { QUOTE_KEY, } from "../constants/grammar-keys.js";
export const getConstDefinition = (value) => ([
    QUOTE_KEY,
    `"${value.const}"`,
    QUOTE_KEY,
]);
//# sourceMappingURL=get-const-definition.js.map