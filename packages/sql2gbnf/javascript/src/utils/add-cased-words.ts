import {
  GrammarBuilder,
} from "gbnf/builder";

import {
  AND,
  AS,
  BETWEEN,
  DIR,
  DISTINCT,
  FROM,
  FULL,
  IN,
  INNER,
  IS, JOIN,
  LEFT,
  LIKE,
  LIMIT,
  NOT,
  OR,
  ON,
  ORDER,
  OUTER,
  RIGHT,
  SELECT,
  UNION,
  WHERE,
  ALL,
  GROUP,
  HAVING,
  COUNT_AGGREGATOR,
  NULL,
  OVER,
  PARTITION,
  ROWS_BETWEEN,
  CURRENT_ROW,
  UNBOUNDED,
  PRECEDING,
  FOLLOWING,
  RANGE_BETWEEN,
  INTERVAL,
  MONTH,
  DAY,
  YEAR,
  MINUTE,
  HOUR,
  SECOND,
  TO,
  RANK,
  DENSE_RANK,
  ROW_NUMBER,
  LEAD,
  LAG,
  OFFSET,
  INTO,
  INSERT,
  DELETE,
  UPDATE,
  VALUES,
} from "../gbnf-keys.js";
import { buildCase, } from "./build-case.js";
import { CaseKind, } from "../types.js";

export type CasedWords = Record<string, string>;

export const addCasedWords = (parser: GrammarBuilder, caseKind: CaseKind): CasedWords => ([
  [INTERVAL, ['interval',],],
  [MONTH, ['month',],],
  [DAY, ['day',],],
  [YEAR, ['year',],],
  [MINUTE, ['minute',],],
  [HOUR, ['hour',],],
  [SECOND, ['second',],],
  [TO, ['to',],],
  [RANK, ['rank',],],
  [DENSE_RANK, ['dense_rank',],],
  [ROW_NUMBER, ['row_number',],],
  [LEAD, ['lead',],],
  [LAG, ['lag',],],
  [ROWS_BETWEEN, ['rows between',],],
  [CURRENT_ROW, ['current row',],],
  [UNBOUNDED, ['unbounded',],],
  [PRECEDING, ['preceding',],],
  [FOLLOWING, ['following',],],
  [RANGE_BETWEEN, ['range between',],],
  [SELECT, ['select',],],
  [INSERT, ['insert',],],
  [UPDATE, ['update',],],
  [DELETE, ['delete',],],
  [VALUES, ['values',],],
  [FROM, ['from',],],
  [INTO, ['into',],],
  [WHERE, ['where',],],
  [ORDER, ['order by',],],
  [GROUP, ['group by',],],
  [HAVING, ['having',],],
  [LIMIT, ['limit',],],
  [OFFSET, ['offset',],],
  [AND, ['and',],],
  [PARTITION, ['partition by',],],
  [AS, ['as',],],
  [NULL, ['null',],],
  [OVER, ['over',],],
  [OR, ['OR',],],
  [ON, ['ON',],],
  [NOT, ['NOT',],],
  [IS, ['IS',],],
  [IN, ['IN',],],
  [LIKE, ['LIKE',],],
  [BETWEEN, ['between',],],
  [DIR, ['asc', 'desc',],],
  [DISTINCT, ['distinct',],],
  [JOIN, ['join',],],
  [INNER, ['inner',],],
  [OUTER, ['outer',],],
  [LEFT, ['left',],],
  [RIGHT, ['right',],],
  [FULL, ['full',],],
  [UNION, ['union',],],
  [ALL, ['all',],],
  [COUNT_AGGREGATOR, ['count',],],
] as [string, string[]][]).reduce<CasedWords>((acc, [key, words,]) => ({
  ...acc,
  [key]: parser.addRule(buildCase(caseKind, ...words), key),
}), {});
