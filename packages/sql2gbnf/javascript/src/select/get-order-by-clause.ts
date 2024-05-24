import {
  join,
} from "gbnf";
import { opt, } from "./get-optional.js";
import { star, } from "./get-star.js";
import { COMMA_KEY, } from "../constants/grammar-keys.js";

export const getOrderByClause = ({
  order,
  direction,
  validColName,
  optionalWhitespace,
  whitespace: ws,
  asAlias,
}: {
  asAlias: string;
  whitespace: string;
  optionalWhitespace: string;
  order: string;
  direction: string;
  validColName: string;
}) => join(
  ws,
  order,
  ws,
  validColName,
  opt(ws, asAlias),
  opt(ws, direction),
  star(
    COMMA_KEY,
    optionalWhitespace,
    validColName,
    opt(ws, direction),
  ),
);