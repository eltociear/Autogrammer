import {
  Grammar as Grammar,
} from './grammar.js';
import {
  isEmptyObject,
  hasDollarSchemaProp,
} from './type-guards.js';
import {
  type JSONSchema,
  type JSON2GBNFOpts,
} from './types.js';
import {
  parse,
} from './utils/parse.js';
import {
  _,
} from 'gbnf/builder-v2';
import {
  value,
} from './constants.js';

const DEFAULT_SCHEMA = {
  type: 'object',
};

export function JSON2GBNF<T extends JSONSchema>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  schema: {} | null | T | boolean = DEFAULT_SCHEMA,
  {
    fixedOrder,
  }: JSON2GBNFOpts = {},
): string {
  if (schema === false) {
    // https://json-schema.org/understanding-json-schema/basics
    // false will always be invalid
    return _`""`.compile();
  }
  if (hasDollarSchemaProp(schema) && schema['$schema'] !== 'https://json-schema.org/draft/2020-12/schema') {
    throw new Error(`Unsupported schema version: ${schema['$schema']}`);
  }

  const parser = new Grammar({
    fixedOrder,
  });

  if (schema === true || schema === null || isEmptyObject(schema)) {
    return _`${value}`.compile();
  }

  const rule = parse(
    parser,
    schema,
  );
  return rule.compile({
    rules: [
      value,
    ],
  });
};
