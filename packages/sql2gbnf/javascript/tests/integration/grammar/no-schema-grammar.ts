import {
  WHITESPACE_KEY as WHITESPACE,
} from 'gbnf';
import {
  BOOLEAN,
  COMMA_KEY,
  NULL_KEY,
  NUMBER,
  DOUBLE_QUOTE_KEY,
  SEMI_KEY,
  SINGLE_QUOTE_KEY,
  LEFT_PAREN_KEY,
  RIGHT_PAREN_KEY,
} from '../../../src/constants/grammar-keys.js';
import {
  AGGREGATORS,
  AND,
  AND_MORE,
  EQUAL_OPS,
  ANY_WHERE_CLAUSE,
  AS,
  BETWEEN,
  BETWEEN_WHERE_CLAUSE,
  DIR,
  DISTINCT,
  FROM,
  IN,
  IN_WHERE_CLAUSE as IN_CLAUSE,
  IS,
  LIKE,
  LIMIT_CLAUSE,
  LIMIT,
  NOT,
  NUMERIC_OPS,
  NUMERIC_WHERE_CLAUSE,
  OPTIONAL_RECOMMENDED_WHITESPACE,
  ORDER_CLAUSE,
  ORDER,
  OR,
  OR_MORE,
  PROJECTION,
  SELECT,
  SELECT_LIST,
  SELECT_QUERY,
  STRING_WITH_DOUBLE_QUOTES,
  STRING_WITH_QUOTES,
  STRING_WITH_SINGLE_QUOTES,
  STRING_OPS,
  TABLE,
  VALUE,
  WHERE_CLAUSE,
  WHERE_INNER,
  WHERE,
  WILDCARD_WHERE_CLAUSE,
  FULL,
  INNER,
  JOIN,
  LEFT,
  OUTER,
  RIGHT,
  JOIN_CLAUSE,
  JOIN_TYPE,
  FULL_OUTER_TYPE,
  VALID_COL_NAME,
  AS_COL_ALIAS,
  AS_TABLE_ALIAS,
  SELECT_TABLES,
  UNION,
  ALL,
  SELECT_QUERY_WITH_UNION,
  VALID_TABLE_NAME,
  ON,
  ANY_VALID_STRING_VALUE_IN_QUOTES,
  GROUP,
  GROUP_CLAUSE,
  HAVING,
  HAVING_CLAUSE,
  NULL,
  ARITHMETIC_OPS,
  COUNT_AGGREGATOR,
} from '../../../src/gbnf-keys.js';
import {
  VALID_COL_NAME_GBNF,
  VALID_TABLE_NAME_GBNF,
} from '../../../src/select/index.js';
import {
  ROOT_ID,
} from '../../../src/sql2gbnf.js';
export const NO_SCHEMA_GRAMMAR = [
  `${AGGREGATORS} ::= "min" | "MIN" | "max" | "MAX" | "avg" | "AVG" | "sum" | "SUM"`,
  `${ALL} ::= "all" | "ALL"`,
  `${AND} ::= "and" | "AND"`,
  `${AND_MORE} ::= ${WHITESPACE} ${AND} ${WHERE_INNER}`,
  [
    ANY_WHERE_CLAUSE,
    '::=',
    EQUAL_OPS,
    OPTIONAL_RECOMMENDED_WHITESPACE,
    VALUE,
  ].join(' '),
  `${ANY_VALID_STRING_VALUE_IN_QUOTES} ::= [^'\\"]+`,
  [
    ARITHMETIC_OPS,
    '::=',
    [
      '"+"',
      '"-"',
      '"*"',
      '"-"',
    ].join(' | '),
  ].join(' '),
  `${AS} ::= "as" | "AS"`,
  `${AS_COL_ALIAS} ::= (${WHITESPACE} ${AS} ${WHITESPACE} ${VALID_COL_NAME})?`,
  `${AS_TABLE_ALIAS} ::= (${WHITESPACE} ${VALID_TABLE_NAME})?`,
  `${BETWEEN} ::= "between" | "BETWEEN"`,
  [
    BETWEEN_WHERE_CLAUSE,
    '::=',
    BETWEEN,
    WHITESPACE,
    `(${[
      `(${[
        NUMBER,
        WHITESPACE,
        AND,
        WHITESPACE,
        NUMBER,
      ].join(' ')})`,
      `(${[
        STRING_WITH_QUOTES,
        WHITESPACE,
        AND,
        WHITESPACE,
        STRING_WITH_QUOTES,
      ].join(' ')})`,
    ].join(' | ')})`,
  ].join(' '),
  `${COUNT_AGGREGATOR} ::= "count" | "COUNT"`,
  `${DIR} ::= "asc" | "ASC" | "desc" | "DESC"`,
  `${DISTINCT} ::= "distinct" | "DISTINCT"`,
  [
    EQUAL_OPS,
    "::=",
    '"="',
    "|",
    '"!="',
    "|",
    IS,
    "|",
    `(${[
      IS,
      WHITESPACE,
      NOT,
    ].join(' ')})`,
  ].join(" "),
  `${FROM} ::= "from" | "FROM"`,
  `${FULL} ::= "full" | "FULL"`,
  `${GROUP} ::= "group by" | "GROUP BY"`,
  [
    GROUP_CLAUSE,
    '::=',
    WHITESPACE,
    'group',
    WHITESPACE,
    SELECT_LIST,
    `(${[
      COMMA_KEY,
      OPTIONAL_RECOMMENDED_WHITESPACE,
      SELECT_LIST
    ].join(' ')})*`,
  ].join(' '),
  `${HAVING} ::= "having" | "HAVING"`,
  [
    HAVING_CLAUSE,
    '::=',
    WHITESPACE,
    HAVING,
    WHITESPACE,
    SELECT_LIST,
    `((${[
      [
        WHITESPACE,
        IS,
        `(${WHITESPACE} ${NOT})?`,
        WHITESPACE,
        NULL,
      ].join(' '),
      [
        OPTIONAL_RECOMMENDED_WHITESPACE,
        NUMERIC_OPS,
        OPTIONAL_RECOMMENDED_WHITESPACE,
        `(${NUMBER} | ${STRING_WITH_QUOTES})`
      ].join(' '),
      [
        WHITESPACE,
        STRING_OPS,
        WHITESPACE,
        STRING_WITH_QUOTES,
      ].join(' '),
      [
        OPTIONAL_RECOMMENDED_WHITESPACE,
        EQUAL_OPS,
        OPTIONAL_RECOMMENDED_WHITESPACE,
        `(${STRING_WITH_QUOTES} | ${BOOLEAN} | ${NUMBER})`,
      ].join(' '),
    ].join(') | (')}))`,
  ].join(' '),
  `${IN} ::= "in" | "IN"`,
  [
    IN_CLAUSE,
    '::=',
    IN,
    WHITESPACE,
    LEFT_PAREN_KEY,
    STRING_WITH_QUOTES,
    `(${COMMA_KEY} ${OPTIONAL_RECOMMENDED_WHITESPACE} ${STRING_WITH_QUOTES})*`,
    RIGHT_PAREN_KEY,
  ].join(' '),
  `${INNER} ::= "inner" | "INNER"`,
  `${IS} ::= "is" | "IS"`,
  `${JOIN} ::= "join" | "JOIN"`,
  [
    JOIN_CLAUSE,
    '::=',
    WHITESPACE,
    `(${JOIN_TYPE})?`,
    JOIN,
    WHITESPACE,
    TABLE,
    WHITESPACE,
    ON,
    WHITESPACE,
    TABLE,
    OPTIONAL_RECOMMENDED_WHITESPACE,
    '"="',
    OPTIONAL_RECOMMENDED_WHITESPACE,
    VALID_COL_NAME,
  ].join(' '),
  `${JOIN_TYPE} ::= (${INNER} ${WHITESPACE}) | (${LEFT} ${WHITESPACE}) | (${RIGHT} ${WHITESPACE}) | (${FULL_OUTER_TYPE})`,
  `${LEFT} ::= "left" | "LEFT"`,
  `${LIKE} ::= "like" | "LIKE"`,
  `${LIMIT} ::= "limit" | "LIMIT"`,
  [
    LIMIT_CLAUSE,
    '::=',
    WHITESPACE,
    LIMIT,
    `(${WHITESPACE} ${NUMBER} ${COMMA_KEY})?`,
    WHITESPACE,
    NUMBER,
  ].join(' '),
  `${NOT} ::= "not" | "NOT"`,
  `${NULL} ::= "null" | "NULL"`,
  [
    NUMERIC_WHERE_CLAUSE,
    '::=',
    NUMERIC_OPS,
    OPTIONAL_RECOMMENDED_WHITESPACE,
    NUMBER,
  ].join(' '),
  [
    NUMERIC_OPS,
    "::=",
    '">"',
    '|',
    '"<"',
    "|",
    '">="',
    "|",
    '"<="',
  ].join(" "),
  `${ON} ::= "on" | "ON"`,
  [
    OPTIONAL_RECOMMENDED_WHITESPACE,
    '::=',
    `(${WHITESPACE})?`,
  ].join(' '),
  `${OR} ::= "or" | "OR"`,
  `${ORDER} ::= "order by" | "ORDER BY"`,
  [
    ORDER_CLAUSE,
    '::=',
    WHITESPACE,
    ORDER,
    WHITESPACE,
    SELECT_LIST,
    `(${WHITESPACE} ${DIR})?`,
  ].join(' '),
  `${OR_MORE} ::= ${WHITESPACE} ${OR} ${WHERE_INNER}`,
  `${OUTER} ::= "outer" | "OUTER"`,
  `${FULL_OUTER_TYPE} ::= (${FULL} ${WHITESPACE})? (${OUTER} ${WHITESPACE})?`,
  `${RIGHT} ::= "right" | "RIGHT"`,
  `root ::= ${ROOT_ID}`,
  `${SELECT} ::= "select" | "SELECT"`,
  `${PROJECTION} ::= ${SELECT_LIST} (${COMMA_KEY} ${OPTIONAL_RECOMMENDED_WHITESPACE} ${SELECT_LIST})*`,
  [
    SELECT_LIST,
    '::=',
    `(${[
      VALID_COL_NAME,
      `(${[
        `(${[
          COUNT_AGGREGATOR,
          LEFT_PAREN_KEY,
          `(${[
            `("*")`,
            `(${[
              VALID_COL_NAME,
              `(${[
                OPTIONAL_RECOMMENDED_WHITESPACE,
                ARITHMETIC_OPS,
                OPTIONAL_RECOMMENDED_WHITESPACE,
                VALID_COL_NAME,
              ].join(' ')})*`,
            ].join(' ')})`,
          ].join(' | ')})`,
          RIGHT_PAREN_KEY,
        ].join(' ')})`,
        `(${[
          AGGREGATORS,
          LEFT_PAREN_KEY,
          VALID_COL_NAME,
          `(${[
            OPTIONAL_RECOMMENDED_WHITESPACE,
            ARITHMETIC_OPS,
            OPTIONAL_RECOMMENDED_WHITESPACE,
            VALID_COL_NAME,
          ].join(' ')})*`,
          RIGHT_PAREN_KEY,
        ].join(' ')})`,
      ].join(' | ')})`,
    ].join(' | ')})`,
    AS_COL_ALIAS,
  ].join(' '),
  [
    SELECT_QUERY,
    '::=',
    SELECT,
    `(${WHITESPACE} ${DISTINCT})?`,
    WHITESPACE,
    `(${PROJECTION} | "*")`,
    WHITESPACE,
    FROM,
    WHITESPACE,
    SELECT_TABLES,
    `(${JOIN_CLAUSE})*`,
    `(${WHERE_CLAUSE})?`,
    `(${GROUP_CLAUSE})?`,
    `(${HAVING_CLAUSE})?`,
    `(${ORDER_CLAUSE})?`,
    `(${LIMIT_CLAUSE})?`,
    `((${WHITESPACE})? ${SEMI_KEY})?`,
  ].join(' '),
  `${SELECT_QUERY_WITH_UNION} ::= ${SELECT_QUERY} (${WHITESPACE} ${UNION} (${WHITESPACE} ${ALL})? ${WHITESPACE} ${SELECT_QUERY})*`,
  `${SELECT_TABLES} ::= ${TABLE} (${COMMA_KEY} ${OPTIONAL_RECOMMENDED_WHITESPACE} ${TABLE})*`,
  `${ROOT_ID} ::= ${SELECT_QUERY_WITH_UNION}`,
  `${STRING_WITH_DOUBLE_QUOTES} ::= ${DOUBLE_QUOTE_KEY} ${ANY_VALID_STRING_VALUE_IN_QUOTES} ${DOUBLE_QUOTE_KEY}`,
  // `${STRING_WILDCARD_WITH_DOUBLE_QUOTES} ::= ${DOUBLE_QUOTE_KEY} ${STRING_KEY} "%" ${DOUBLE_QUOTE_KEY}`,
  // `${STRING_WILDCARD_WITH_SINGLE_QUOTES} ::= ${SINGLE_QUOTE_KEY} ${STRING_KEY} "%" ${SINGLE_QUOTE_KEY}`,
  [
    STRING_OPS,
    "::=",
    LIKE,
  ].join(" "),
  `${STRING_WITH_QUOTES} ::= (${STRING_WITH_SINGLE_QUOTES} | ${STRING_WITH_DOUBLE_QUOTES})`,
  `${STRING_WITH_SINGLE_QUOTES} ::= ${SINGLE_QUOTE_KEY} ${ANY_VALID_STRING_VALUE_IN_QUOTES} ${SINGLE_QUOTE_KEY}`,
  `${TABLE} ::= ${VALID_TABLE_NAME} ${AS_TABLE_ALIAS}`,
  `${UNION} ::= "union" | "UNION"`,
  [
    VALUE,
    '::=',
    `(${NUMBER} | ${NULL_KEY} | ${BOOLEAN} | ${STRING_WITH_QUOTES})`,
  ].join(' '),
  `${VALID_COL_NAME} ::= ${VALID_COL_NAME_GBNF}`,
  `${VALID_TABLE_NAME} ::= ${VALID_TABLE_NAME_GBNF}`,
  `${WHERE} ::= "where" | "WHERE"`,
  `${WHERE_CLAUSE} ::= ${WHITESPACE} ${WHERE} (${NOT})? ${WHERE_INNER} (${AND_MORE} | ${OR_MORE})*`,
  [
    WHERE_INNER,
    '::=',
    WHITESPACE,
    TABLE,
    OPTIONAL_RECOMMENDED_WHITESPACE,
    `(${[
      ANY_WHERE_CLAUSE,
      NUMERIC_WHERE_CLAUSE,
      WILDCARD_WHERE_CLAUSE,
      IN_CLAUSE,
      BETWEEN_WHERE_CLAUSE,
    ].join(' | ')
    })`,
  ].join(' '),
  [
    WILDCARD_WHERE_CLAUSE,
    '::=',
    STRING_OPS,
    OPTIONAL_RECOMMENDED_WHITESPACE,
    STRING_WITH_QUOTES,
  ].join(' '),
];