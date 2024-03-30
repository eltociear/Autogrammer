import { RuleDef, RuleType, RuleRange, RuleWithNumericValue, isRuleDefChar, isRuleDefCharRngUpper, isRuleDefRange, isRuleDefCharAlt, isRuleDefAlt, isRuleDefEnd, RuleCharOrAltChar, } from "../types.js";


const getNumericValue = (rule: RuleCharOrAltChar): number => {
  const value = rule.value;
  if (Array.isArray(value)) {
    if (value.length > 1) {
      throw new Error(`For building ranges, only a single value is supported. This is: ${JSON.stringify(value)}`);
    }
    return value[0];
  }
  return value;
};

// Function to build a regex rule
const buildRangeRule = (prevRule: RuleCharOrAltChar, currentRule: RuleWithNumericValue): RuleRange => {
  return {
    type: RuleType.RANGE,
    value: [[getNumericValue(prevRule), currentRule.value,],],
  };
};

export const buildRuleStack = (linearRules: RuleDef[]): RuleDef[][] => {
  let paths: RuleDef[] = [];

  const stack: RuleDef[][] = [];

  let idx = 0;
  while (idx < linearRules.length) {
    const ruleDef = linearRules[idx];
    if (isRuleDefAlt(ruleDef)) {
      if (paths.length) {
        paths.push({ type: RuleType.END, });
        stack.push(paths);
        paths = [];
      }
    } else if (isRuleDefCharAlt(ruleDef)) {
      const previousRule = linearRules[idx - 1];
      if (isRuleDefCharRngUpper(previousRule)) {
        // exhaust this sequence of CHAR_ALT and CHAR_RNG_UPPER rules

        let prevValue: number = ruleDef.value;
        idx += 1;
        while (idx < linearRules.length && (isRuleDefCharRngUpper(linearRules[idx]) || isRuleDefChar(linearRules[idx]))) {
          const rule = linearRules[idx];
          if (prevValue !== undefined && !isRuleDefCharRngUpper(rule)) {
            throw new Error(`Unexpected sequence, expected a CHAR_RNG_UPPER rule but got ${rule.type}`);
          }

          switch (rule.type) {
            case RuleType.CHAR:
              throw new Error('Should never get here');
            case RuleType.CHAR_ALT:
              prevValue = rule.value;
              break;
            case RuleType.CHAR_RNG_UPPER:
              const prevRule = paths.pop();
              if (!isRuleDefRange(prevRule)) {
                throw new Error(`Unexpected previous rule: ${JSON.stringify(prevRule)}`);
              }
              prevRule.value.push([prevValue, rule.value,]);
              paths.push(prevRule);
              prevValue = undefined;
              break;
            default:
              throw new Error('Should never get here');
          }

          idx += 1;
        }

        // decrement by 1, to account for the last increment at the end of the while loop
        idx -= 1;

        if (prevValue !== undefined) {
          throw new Error(`Unexpected end of sequence, lingering prev value: ${prevValue}`);
        }
      } else if (isRuleDefChar(previousRule)) {
        let currentCharAlt = linearRules[idx];
        while (idx < linearRules.length && isRuleDefCharAlt(currentCharAlt)) {
          previousRule.value.push(currentCharAlt.value);
          idx += 1;
          currentCharAlt = linearRules[idx];
        }
        // decrement by 1, to account for the last increment at the end of the while loop
        idx -= 1;
      } else {
        throw new Error(`Unexpected previous rule: ${JSON.stringify(previousRule)}, expected CHAR or CHAR_ALT`);
      }

    } else if (isRuleDefCharRngUpper(ruleDef)) {
      const prevRule = paths.pop();
      if (!isRuleDefChar(prevRule) && !isRuleDefCharAlt(prevRule)) {
        throw new Error(`Unexpected previous rule: ${JSON.stringify(prevRule)}, expected CHAR or CHAR_ALT`);
      }
      paths.push(buildRangeRule(prevRule, ruleDef));
    } else {
      paths.push(ruleDef);
    }

    idx += 1;
  }
  if (!isRuleDefEnd(paths[paths.length - 1])) {
    paths.push({ type: RuleType.END, });
  }

  stack.push(paths);

  return stack;
};
