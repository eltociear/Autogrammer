import { getID, } from './utils/get-id.js';
import { buildGrammar, } from './utils/build-grammar.js';
import { getConstKey, } from './utils/get-const-key.js';
import { getConstRule, } from './utils/get-const-rule.js';
export class Grammar {
    #rules = new Map();
    fixedOrder;
    // whitespace can be Infinity or an integer greater than or equal to 0.
    whitespace;
    constructor({ whitespace = 1, fixedOrder = false, } = {}) {
        if (whitespace < 0) {
            throw new Error('Whitespace must be greater than or equal to 0. It can also be infinity.');
        }
        this.whitespace = whitespace;
        this.fixedOrder = fixedOrder;
    }
    getConst = (key, { left = true, right = true, } = {}) => this.whitespace !== 0 ? this.addRule(getConstRule(this, key, left, right), getConstKey(key, left, right)) : key;
    addRule = (rule, key) => {
        const symbolId = key ? key : (this.#rules.get(rule) ?? `x${getID(this.#rules.size)}`);
        this.#rules.set(rule, symbolId);
        return symbolId;
    };
    get grammar() {
        return buildGrammar(this.#rules.entries());
    }
}
//# sourceMappingURL=grammar.js.map