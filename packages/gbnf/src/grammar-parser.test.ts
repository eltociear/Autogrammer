import { GrammarParser } from './grammar-parser.js';

describe('Grammar Parser Tests', () => {
  describe('Parsing Basic Grammar', () => {
    const grammar = `root  ::= (expr "=" term "\n")+
            expr  ::= term ([-+*/] term)*
            term  ::= [0-9]+`;


    it('Should correctly parse symbol ids', () => {
      const parsedGrammar = new GrammarParser(grammar);
      const expectedSymbolIds: [string, number][] = [
        ["expr", 2],
        ["expr_5", 5],
        ["expr_6", 6],
        ["root", 0],
        ["root_1", 1],
        ["root_4", 4],
        ["term", 3],
        ["term_7", 7],
      ];

      let index: number = 0;
      for (const [key, value] of parsedGrammar.symbolIds.entries()) {
        const [expectedKey, expectedValue] = expectedSymbolIds[index];

        expect(key).to.equal(expectedKey);
        expect(value).to.equal(expectedValue);

        index++;
      }
    });

    it('Should correctly parse grammar rules', () => {
      const expectedRules: llama_grammar_element[] = [
        // Expected rules here
      ];

      let index: number = 0;
      for (const rule of parsedGrammar.rules) {
        for (const element of rule) {
          const expectedElement = expectedRules[index];

          expect(element.type).to.equal(expectedElement.type);
          expect(element.value).to.equal(expectedElement.value);

          index++;
        }
      }
    });
  });

  describe('Parsing Longer Grammar', () => {
    let parsedGrammar: ParseState;

    beforeEach(() => {
      const longerGrammarBytes: string = `
            root  ::= (expr "=" ws term "\n")+
            expr  ::= term ([-+*/] term)*
            term  ::= ident | num | "(" ws expr ")" ws
            ident ::= [a-z] [a-z0-9_]* ws
            num   ::= [0-9]+ ws
            ws    ::= [ \t\n]*`;

      parsedGrammar = parse(longerGrammarBytes);
    });

    it('Should correctly parse symbol ids for longer grammar', () => {
      const expectedSymbolIdsLonger: [string, number][] = [
        ["expr", 2],
        ["expr_6", 6],
        ["expr_7", 7],
        ["ident", 8],
        ["ident_10", 10],
        ["num", 9],
        ["num_11", 11],
        ["root", 0],
        ["root_1", 1],
        ["root_5", 5],
        ["term", 4],
        ["ws", 3],
        ["ws_12", 12],
      ];

      let index: number = 0;
      for (const [key, value] of parsedGrammar.symbolIds.entries()) {
        const [expectedKey, expectedValue] = expectedSymbolIdsLonger[index];

        expect(key).to.equal(expectedKey);
        expect(value).to.equal(expectedValue);

        index++;
      }
    });

    it('Should correctly parse grammar rules for longer grammar', () => {
      const expectedRulesLonger: llama_grammar_element[] = [
        // Expected rules here
      ];

      let index: number = 0;
      for (const rule of parsedGrammar.rules) {
        for (const element of rule) {
          const expectedElement = expectedRulesLonger[index];

          expect(element.type).to.equal(expectedElement.type);
          expect(element.value).to.equal(expectedElement.value);

          index++;
        }
      }
    });
  });
});
