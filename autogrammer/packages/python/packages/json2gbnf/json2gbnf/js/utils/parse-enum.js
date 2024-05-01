import { QUOTE_KEY, } from "../constants/grammar-keys.js";
import { join, } from "./join.js";
export const parseEnum = (schema, addRule) => addRule(schema.enum.map(value => join(QUOTE_KEY, `"${value}"`, QUOTE_KEY)).join(' | '));
//# sourceMappingURL=parse-enum.js.map