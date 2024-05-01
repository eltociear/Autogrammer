import { getWhitespace, } from "./get-whitespace.js";
import { join, } from "./join.js";
export const getConstRule = (parser, key, left, right) => join(left ? getWhitespace(parser) : undefined, key, right ? getWhitespace(parser) : undefined);
//# sourceMappingURL=get-const-rule.js.map