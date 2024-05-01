import { describe, it, expect, vi, } from 'vitest';
import { parseType, } from './parse-type.js';
import {
  ARRAY_KEY,
  BOOLEAN_KEY,
  INTEGER_KEY,
  NULL_KEY,
  NUMBER_KEY,
  OBJECT_KEY,
  STRING_KEY,
} from '../constants/grammar-keys.js';
import {
  type Grammar,
} from '../grammar.js';
import {
  type ParseTypeArg,
} from '../types.js';

const getmockGrammar = () => {
  class MockGrammar {
    rules = 'foo';
    addRule = vi.fn();
    getConst = vi.fn();
    opts = {};
  }

  return new MockGrammar() as any as Grammar;
};

describe('parseType', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should parse string type', () => {
    const schema = { type: 'string', };
    const mockGrammar = getmockGrammar();
    expect(parseType(mockGrammar, schema as ParseTypeArg)).toBe(STRING_KEY);
  });

  it('should parse number type', () => {
    const schema = { type: 'number', };
    const mockGrammar = getmockGrammar();
    expect(parseType(mockGrammar, schema as ParseTypeArg)).toBe(NUMBER_KEY);
  });

  it('should parse integer type', () => {
    const schema = { type: 'integer', };
    const mockGrammar = getmockGrammar();
    expect(parseType(mockGrammar, schema as ParseTypeArg)).toBe(INTEGER_KEY);
  });

  it('should throw an error if unsupported keys are present for number/integer type', () => {
    const mockGrammar = getmockGrammar();
    const schema = { type: 'number', exclusiveMinimum: 0, };
    expect(() => parseType(mockGrammar, schema as ParseTypeArg)).toThrowError('exclusiveMinimum is not supported');
  });

  it('should parse boolean type', () => {
    const schema = { type: 'boolean', };
    const mockGrammar = getmockGrammar();
    expect(parseType(mockGrammar, schema as ParseTypeArg)).toBe(BOOLEAN_KEY);
  });

  it('should parse null type', () => {
    const schema = { type: 'null', };
    const mockGrammar = getmockGrammar();
    expect(parseType(mockGrammar, schema as ParseTypeArg)).toBe(NULL_KEY);
  });

  it('should parse array type', () => {
    const schema = { type: 'array', };
    const mockGrammar = getmockGrammar();
    expect(parseType(mockGrammar, schema as ParseTypeArg)).toBe(ARRAY_KEY);
  });

  it('should parse object type', () => {
    const schema = { type: 'object', };
    const mockGrammar = getmockGrammar();
    expect(parseType(mockGrammar, schema as ParseTypeArg)).toBe(OBJECT_KEY);
  });
});