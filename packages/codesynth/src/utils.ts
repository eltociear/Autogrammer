import { ExternalExecuteOptions } from "contortionist";
import { SupportedLanguage } from "./types.js";

export const parseOptions = (options: ExternalExecuteOptions<any>) => {
  return {
    ...options,
  }
};

export const buildPrompt = (prompt: string, language: SupportedLanguage) => {
  return `
  You are a very helpful codebot. Do your best to answer the user's query using only the language "${language}".

  ${prompt}
  `.trim();
};
