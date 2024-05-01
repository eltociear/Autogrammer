import { joinWith, } from "./join.js";
export const getConstKey = (key, left, right) => joinWith('', left ? 'ws' : undefined, key, right ? 'ws' : undefined);
//# sourceMappingURL=get-const-key.js.map