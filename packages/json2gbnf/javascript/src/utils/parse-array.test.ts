import {
  describe,
  it,
  expect,
  afterEach,
  vi,
  test,
} from 'vitest';
import { parseArray, } from './parse-array.js';
import { JSONSchemaArray } from '../types.js';
import type * as _parseType from './parse-type.js';
import GBNF from 'gbnf';

vi.mock('./parse-type.js', async () => {
  const actual = await vi.importActual('./parse-type.js') as typeof _parseType;
  return {
    ...actual,
    parseType: vi.fn(),
  };
});

describe('parseArray', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test.each([
    [{ type: 'array', }, []],
    [{ type: 'array', items: { type: 'string', }, }, ['foo', 'bar', 'baz']],
    [{ type: 'array', items: { type: ['string', 'number'], }, }, ['foo', 1, 'baz', 2]],
  ] as [JSONSchemaArray, unknown[]][])(`it handles schema '%s' for '%s'`, (schema, initial) => {
    const rule = parseArray(schema);
    expect(() => GBNF([
      rule.compile(),
      `value ::= ""`,
    ].join('\n'), JSON.stringify(initial))).not.toThrow();
  });


  it.each([true, false])('should throw an error if items is a boolean', (items) => {
    const schema = { type: 'array', items, } as unknown as JSONSchemaArray;
    expect(() => parseArray(schema)).toThrowError(
      'boolean items is not supported, because prefixItems is not supported',
    );
  });

  it('should throw an error if an unsupported key is present', () => {
    const schema: JSONSchemaArray = { type: 'array', prefixItems: [], };
    expect(() => parseArray(schema)).toThrowError(
      'prefixItems is not supported',
    );
  });

});
