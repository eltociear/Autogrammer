import {
  describe,
  test,
  expect,
} from 'vitest';
import {
  getDeleteRule,
} from './index.js';
import {
  $,
  _,
} from 'gbnf/builder';
import GBNF from 'gbnf';
import { FULL_SELECT_QUERY } from '../keys.js';

describe('delete', () => {
  test.each([
    'DELETE',
    'delete',
    'DELETE FROM',
    'delete from',
    'DELETE FROM table',
    'DELETE FROM table t',
    'DELETE FROM table t USING customers c',
    'DELETE FROM table USING customers c',
    'DELETE FROM table USING customers',
    'DELETE FROM table t JOIN products p',
    'DELETE FROM table JOIN products p',
    'DELETE FROM table JOIN products ON o.product_id = p.product_id',
    'DELETE FROM table t JOIN products p ON o.product_id = p.product_id',
    'DELETE FROM table t USING customers c JOIN products p ON o.product_id = p.product_id',
    'DELETE FROM table USING customers JOIN products ON products.product_id = table.product_id',
    'DELETE FROM table t WHERE o.total_amount > 100',
    'DELETE FROM table WHERE o.total_amount > 100',
    'DELETE FROM table WHERE o.total_amount > 100 AND c.country = "USA"',
    'DELETE FROM table ORDER BY o.order_date DESC',
    'DELETE FROM table ORDER BY o.order_date DESC LIMIT 10',
    `DELETE FROM orders o \\n `,
    `DELETE FROM orders o \\n USING customers c \\n JOIN products p ON o.product_id = `,
    `DELETE FROM orders o \\n USING customers c \\n JOIN products p ON o.product_id = p.product_id \\n WHERE o.total_amount > 100 \\n `,
    `DELETE FROM orders o \\n USING customers c \\n JOIN products p ON o.product_id = p.product_id \\n WHERE o.total_amount > 100 \\n AND c.country = 'USA' \\n AND p.category = 'Electronics' \\n `,
    `DELETE FROM orders o \\n USING customers c \\n JOIN products p ON o.product_id = p.product_id \\n WHERE o.total_amount > 100 \\n AND c.country = 'USA' \\n AND p.category = 'Electronics' \\n ORDER BY o.order_date DESC \\n `,
    `DELETE FROM orders o \\n USING customers c \\n JOIN products p ON o.product_id = p.product_id \\n WHERE o.total_amount > 100 \\n AND c.country = 'USA' \\n AND p.category = 'Electronics' \\n ORDER BY o.order_date DESC \\n LIMIT 10`,
  ])('it parses schema to grammar with input "%s"', (initial) => {
    const ws = _`[ \\n\\r]`;
    const deleteRule = getDeleteRule({
      mandatoryWhitespace: ws.wrap('+'),
      optionalRecommendedWhitespace: ws.wrap('*'),
      optionalNonRecommendedWhitespace: ws.wrap('*'),
    });
    let parser = GBNF([
      deleteRule.compile({
        caseKind: 'any',
      }),
      `${FULL_SELECT_QUERY} ::= "FULL_SELECT_RULE"`,
    ].join('\n'));
    parser = parser.add(initial.split('\\n').join('\n'));
    expect(parser.size).toBeGreaterThan(0);
  });
});

