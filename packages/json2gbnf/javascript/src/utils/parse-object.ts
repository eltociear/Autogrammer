import { getAllPermutations, } from './get-all-permutations.js';
import { parseEnum, } from './parse-enum.js';
import {
  JSONSchemaObject,
  JSONSchemaValue,
} from '../types.js';
import { parseType, } from './parse-type.js';
import {
  isSchemaConst,
  isSchemaEnum,
} from '../type-guards.js';
import {
  parseConst,
} from './parse-const.js';
import {
  _,
  GBNFRule,
} from 'gbnf/builder-v2';
import {
  object,
  quote,
  string,
  value,
} from '../constants.js';

const UNSUPPORTED_PROPERTIES: (keyof JSONSchemaObject)[] = [
  'patternProperties',
  'allOf',
  'unevaluatedProperties',
  'propertyNames',
  'minProperties',
  'maxProperties',
];

interface ObjectEntry {
  rule: GBNFRule;
  key?: string;
}

const filterObjectEntry = (permutation: ObjectEntry[], key: string): boolean => {
  let keyIsValid = false;
  for (const perm of permutation) {
    if (perm.key === key) {
      keyIsValid = true;
      break;
    }
  }
  return keyIsValid;
};

const getPropertiesValue = (value: JSONSchemaValue): GBNFRule => {
  if (isSchemaConst(value)) {
    return parseConst(value);
  }
  if (isSchemaEnum(value)) {
    return parseEnum(value);
  }
  return parseType(value);
};

export const parseObject = (
  schema: JSONSchemaObject,
  fixedOrder?: boolean,
): GBNFRule => {
  for (const key of UNSUPPORTED_PROPERTIES) {
    if (key in schema) {
      throw new Error(`${key} is not supported`);
    }
  }
  const { additionalProperties = true, properties, required = [], } = schema;
  if (properties !== undefined && typeof properties === 'object') {
    const keys: ObjectEntry[] = Object.entries(properties).map(([key, value,]) => ({
      key,
      rule: _` ${quote} ${`"${key}"`} ${quote} ":"  ${getPropertiesValue(value)} `,
    }));
    if (fixedOrder) {
      const getPermutation = (entries: ObjectEntry[]) => _`
        ${[entries[0].rule, ...entries.slice(1).map(({ rule, }) => _`"," ${rule}`.wrap('?')),]}
      `;
      const permutations = Array(keys.length).fill(0).map((__, i) => getPermutation(keys.slice(i)));
      return _`
        "{"
          ${_`${permutations}`.separate(' | ').wrap('?')}
        "}"
      `;
    }

    if (additionalProperties) {
      const anyObjectEntry = _` ${string} ":" ${value} `;
      keys.push({
        rule: _` ${anyObjectEntry} ${_`"," ${anyObjectEntry}`.wrap('*')}`.wrap('?'),
      });
    }

    const permutations = getAllPermutations(
      keys,
      filterObjectEntry,
      required,
    ).map(r => r.map(({
      rule,
    }) => rule.wrap('?'))).map(permutation => permutation.length === 1 ? permutation : _`${permutation}`.separate('","'));

    return _`
      "{"
        ${permutations.length === 1 ? permutations[0] : _`${permutations}`.separate('|')}
      "}"
    `;
  }

  return object;
};
