import { joinPipe, } from "gbnf";
import { rule, } from "./get-rule.js";

export const any = (...arr: string[]): string => rule(joinPipe(...arr));
