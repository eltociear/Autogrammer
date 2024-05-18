import {
  describe,
  test,
  expect,
} from 'vitest';
import GBNF, { InputParseError } from "gbnf";
import { getJoinClause, } from "./get-join-clause.js";
import { getJoinCondition } from './get-join-condition.js';

describe('getJoinClause', () => {
  const grammar = getJoinClause({
    joinKey: '"JOIN"',
    joinType: 'joinType',
    tableWithOptionalAlias: 'validName',
    on: '"ON"',
    whitespace: 'ws',
    joinCondition: getJoinCondition({
      and: '"AND"',
      or: '"OR"',
      whitespace: 'ws',
      equijoinCondition: 'validName optws "=" optws validName',
      optionalRecommendedWhitespace: 'optws',
      optionalNonRecommendedWhitespace: 'optnws',
      leftParen: 'lparen',
      rightParen: 'rparen',
    }),
  });
  test.each([
    'JOIN table1 ON table1.col1 = table2.col2',
    'INNER JOIN table1 ON table1.col1 = table2.col2',
    'INNER JOIN table1  ON table1.col1 = table2.col2',
    'INNER JOIN table1 ON (table1.col1 = table2.col2)',
    'INNER JOIN table1 ON ( table1.col1 = table2.col2 )',
  ])('it parses schema to grammar with input "%s"', (initial) => {
    const fullGrammar = [
      `root ::= ${grammar}`,
      `joinType ::= ("INNER "|"LEFT "|"RIGHT "|"OUTER "|"FULL OUTER ")`,
      `ws ::= (" ")+`,
      `optws ::= (" ")*`,
      `optnws ::= optws`,
      `lparen ::= "("`,
      `rparen ::= ")"`,
      `validName ::= ([a-zA-Z1-9_.])+`,
    ].join('\n')
    // console.log(fullGrammar);
    let parser = GBNF(fullGrammar);
    parser = parser.add(' ' + initial.split('\\n').join('\n'));
    expect(parser.size).toBeGreaterThan(0);
  });

  test.each([
    ['INNER JOIN table1 ON (table1.col1 = table2.col2;', 48],
    ['INNER JOIN table1 ON table1.col1 = table2.col2);', 47],
  ])('it raises on bad input %s', (_initial, errorPos) => {
    const fullGrammar = [
      `root ::= ${grammar}`,
      `joinType ::= ("INNER "|"LEFT "|"RIGHT "|"OUTER "|"FULL OUTER ")`,
      `ws ::= (" ")+`,
      `optws ::= (" ")*`,
      `optnws ::= optws`,
      `lparen ::= "("`,
      `rparen ::= ")"`,
      `validName ::= ([a-zA-Z1-9_.])+`,
    ].join('\n')
    // console.log(fullGrammar);
    let parser = GBNF(fullGrammar);
    const initial = ' ' + _initial.split('\\n').join('\n');
    expect(() => parser.add(initial)).toThrowError(new InputParseError(initial, errorPos));
  });

});

