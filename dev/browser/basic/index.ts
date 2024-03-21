import GBNF from '../../../packages/gbnf/src/index.js';

const grammarBytes = `
root  ::= (expr "=" ws term "\n")+
expr  ::= term ([-+*/] term)*
term  ::= ident | num | "(" ws expr ")" ws
ident ::= [a-z] [a-z0-9_]* ws
num   ::= [0-9]+ ws
ws    ::= [ \t\n]*
`;

const gbnf = GBNF(grammarBytes);
console.log(gbnf)
