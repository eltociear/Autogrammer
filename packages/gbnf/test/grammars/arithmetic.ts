export const grammar = `
root  ::= (expr "=" ws term "\n")+
expr  ::= term ([-+*/] term)*
term  ::= ident | num | "(" ws expr ")" ws
ident ::= [a-z] [a-z0-9_]* ws
num   ::= [0-9]+ ws
ws    ::= [ \t\n]*
`;
export const testCases = [
  "1",
  "1 +",
  "and",
  "1 +2",
  "1 +2+",
  "1 +2=3",
  "1 +2 +3",
  "1 +2= 3",
  "1 +2 =3",
  "1 +2 = 3",
  "1 +2*3=9",
  "1 +2+3=6",
  "1 +2 *3=9",
  "1 +2+3 = 6",
  "3 +4*5= 23",
  "1 +2*3 = 9",
  "1 +2 /3*4 =",
  "1 +2 *3 = 9",
  "2 +3 *4 =14",
  "2 +3 *4 = 14",
  "2 +5 *4 = 26",
  "(1)\n  -3 +2 *5 =\n  (2)",
  "3\n\n  *args *nums = list",
  "3\n  \n  *hint*1 +2 *3 = 1",
  "1 +2 *3 = 9\n  \n  \n  \n\n2-5",
  "3\n  -2 +1\n\n  *a *b -c = d",
  "3\n  -3\n  \n  *args -args = 0",
  "3\n  \n  *args -a\n  \n  *args -f",
  "and\n  \n  \n  \n  -2 *(1 -3) +4 = 2",
  "and\n\n  *args -var_name\n     -1 = args0",
  "3\n\n  *hint*(1)\n    *looks_like_this\n    *is_valid",
  "(invalid)\n  \n  *valid*(non-answer)\n  \n  *valid*(answer)",
  "(a) -2 *3\n  -4\n  \n  *4\n  -16\n  \n  *6\n  -36\n  \n  /3 \n  -3",
  "2\n  \n  *hint*1-10\n\n  *hint*11-14\n\n  *hint*15-17\n\n  *hint*18-21",
  "3+7/2*5\n  \n  *(numbers) = (number1 +number2 +number3+number4 +number5)",
  "4\n  \n  *hint*(donot /use/operator)\n  \n  *hint*(try-using-input-function)\n  \n  *hint*(try-using-if-",
  "3\n  \n  *hint*(you *might*want*to *look*at *the*order-of-operations)\n\n  *hint*(you *might*want*to *use*a *",
  "3\n  \n  *hint*(you *can*use *and*or)\n\n  *hint*(you *can*use *and*or)\n  \n  *hint*(you *can*use *and*or)\n  \n  *"
]
