import { getConstRule } from './get-const-rule.js';
import { SchemaParser } from '../schema-parser.js';
import { getWhitespace } from './get-whitespace.js';
import { vi } from 'vitest';

vi.mock('./get-whitespace.js');

describe('getConstRule', () => {
  const mockParser: SchemaParser = {} as SchemaParser;

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the rule with left and right whitespace', () => {
    vi.mocked(getWhitespace).mockReturnValue('ws');

    const key = 'CONST_KEY';
    const left = true;
    const right = true;

    const result = getConstRule(mockParser, key, left, right);
    expect(result).toBe('ws CONST_KEY ws');
  });

  it('should return the rule with left whitespace', () => {
    vi.mocked(getWhitespace).mockReturnValue('ws');

    const key = 'CONST_KEY';
    const left = true;
    const right = false;

    const result = getConstRule(mockParser, key, left, right);
    expect(result).toBe('ws CONST_KEY');
  });

  it('should return the rule with right whitespace', () => {
    vi.mocked(getWhitespace).mockReturnValue('ws');

    const key = 'CONST_KEY';
    const left = false;
    const right = true;

    const result = getConstRule(mockParser, key, left, right);
    expect(result).toBe('CONST_KEY ws');
  });

  it('should return the rule with no whitespace', () => {
    vi.mocked(getWhitespace).mockReturnValue('ws');

    const key = 'CONST_KEY';
    const left = false;
    const right = false;

    const result = getConstRule(mockParser, key, left, right);
    expect(result).toBe('CONST_KEY');
  });
});
