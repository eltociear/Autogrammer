import {
  describe,
  test,
  expect,
} from 'vitest';
// import SQL2GBNF from 'sql2gbnf';
import {
  SQL2GBNF,
} from '../../src/sql2gbnf.js';
import GBNF from 'gbnf';
import { noSchemaTests } from './no-schema-tests/index.js';

describe('synthetic, no schema', () => {
  // test('it parses schema to grammar', () => {
  //   const grammar = SQL2GBNF();
  //   expect(grammar).toEqual([
  //     ...NO_SCHEMA_GRAMMAR,
  //     ...GBNF_GLOBAL_CONSTANTS,
  //     ...GLOBAL_CONSTANTS
  //   ].join('\n'));
  // });

  test.each(noSchemaTests)('it parses schema to grammar with input "%s"', (initial) => {
    const grammar = SQL2GBNF({
      whitespace: 'verbose',
    });
    // console.log(grammar);
    let parser = GBNF(grammar);
    parser = parser.add(initial.split('\\n').join('\n'));
    expect(parser.size).toBeGreaterThan(0);
  });
});