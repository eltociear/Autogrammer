import { describe, it, expect, vi, } from 'vitest';
import { parseArray, } from './parse-array.js';
import {
  ARRAY_KEY,
  COMMA_KEY,
  LEFT_BRACKET_KEY,
  NUMBER_KEY,
  RIGHT_BRACKET_KEY,
  STRING_KEY,
} from '../constants/grammar-keys.js';
import { JSONSchemaArray } from '../types.js';
import {
  parseType,
} from './parse-type.js';
import type * as _parseType from './parse-type.js';
import { SchemaParser, } from '../schema-parser.js';

vi.mock('./parse-type.js', async () => {
  const actual = await vi.importActual('./parse-type.js') as typeof _parseType;
  return {
    ...actual,
    parseType: vi.fn((schema: any) => 'parsedType'),
  };
});

const getMockParser = () => {
  class MockSchemaParser {
    rules = 'foo';
    addRule = vi.fn().mockImplementation((key: string) => key);
    getConst = vi.fn().mockImplementation((key: string) => key);
    opts = {};
  }

  return new MockSchemaParser() as any as SchemaParser;
};

describe('parseArray', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return ARRAY_KEY if items is undefined', () => {
    const schema = {};
    const mockParser = getMockParser();
    expect(parseArray(mockParser, schema as JSONSchemaArray)).toBe(ARRAY_KEY);
    expect(mockParser.addRule).not.toHaveBeenCalled();
    expect(mockParser.getConst).not.toHaveBeenCalled();
    expect(parseType).not.toHaveBeenCalled();
  });

  it.each([true, false])('should throw an error if items is a boolean', (items) => {
    const schema = { type: 'array', items, } as unknown as JSONSchemaArray;
    const mockParser = getMockParser();
    expect(() => parseArray(mockParser, schema)).toThrowError(
      'boolean items is not supported, because prefixItems is not supported',
    );
  });

  it('should throw an error if an unsupported key is present', () => {
    const schema: JSONSchemaArray = { type: 'array', prefixItems: [], };
    const mockParser = getMockParser();
    expect(() => parseArray(mockParser, schema)).toThrowError(
      'prefixItems is not supported',
    );
  });

  it('should parse array with items of a single type', () => {
    const schema: JSONSchemaArray = { type: 'array', items: { type: 'string', }, };
    const expected = `${LEFT_BRACKET_KEY} (${STRING_KEY} (${COMMA_KEY} ${STRING_KEY})*)? ${RIGHT_BRACKET_KEY}`;
    // vi.mocked(parseType).mockImplementation(() => 'parsedType');
    const mockParser = getMockParser();
    expect(parseArray(mockParser, schema)).toBe(expected);
    expect(mockParser.getConst).toHaveBeenCalledTimes(3);
  });

  it('should parse array with items of multiple types', () => {
    const schema: JSONSchemaArray = { type: 'array', items: { type: ['string', 'number'], }, };
    const expected = `${LEFT_BRACKET_KEY} (${STRING_KEY} | ${NUMBER_KEY} (${COMMA_KEY} ${STRING_KEY} | ${NUMBER_KEY})*)? ${RIGHT_BRACKET_KEY}`;
    const mockParser = getMockParser();
    vi.mocked(parseType).mockImplementation(() => 'parsedType');
    expect(parseArray(mockParser, schema as JSONSchemaArray)).toBe(expected);
    expect(mockParser.addRule).toHaveBeenCalledWith(`${STRING_KEY} | ${NUMBER_KEY}`);
    expect(mockParser.getConst).toHaveBeenCalledTimes(3);
    expect(parseType).not.toHaveBeenCalled();
  });
});
