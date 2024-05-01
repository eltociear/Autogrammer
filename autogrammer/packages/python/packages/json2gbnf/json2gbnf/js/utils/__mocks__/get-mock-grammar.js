import { vi, } from 'vitest';
export const getMockGrammar = ({ getConst = vi.fn().mockImplementation((key) => key), addRule = vi.fn().mockImplementation((key) => key), fixedOrder = false, } = {}) => {
    class MockGrammar {
        rules = 'foo';
        addRule = addRule;
        getConst = getConst;
        fixedOrder = fixedOrder;
    }
    return new MockGrammar();
};
//# sourceMappingURL=get-mock-grammar.js.map