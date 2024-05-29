import { rule, } from "../utils/get-rule.js";
import { star, } from "../utils/get-star.js";
import { any, } from "../utils/any.js";

export const getJoinCondition = ({
  whitespace,
  and,
  or,
  // optionalRecommendedWhitespace,
  optionalNonRecommendedWhitespace,
  leftParen,
  rightParen,
  equijoinCondition,
}: {
  whitespace: string;
  and: string;
  or: string;
  optionalRecommendedWhitespace: string;
  optionalNonRecommendedWhitespace: string;
  leftParen: string;
  rightParen: string;
  equijoinCondition: string;
}) => {
  const equijoinConditions = rule(
    equijoinCondition,
    star(
      whitespace,
      any(and, or),
      whitespace,
      equijoinCondition,
    ),
  );
  return any(
    rule(
      leftParen,
      optionalNonRecommendedWhitespace,
      equijoinConditions,
      optionalNonRecommendedWhitespace,
      rightParen,
    ),
    equijoinConditions,
  );
};
