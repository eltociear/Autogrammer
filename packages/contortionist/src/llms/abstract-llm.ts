// import { ModelDefinition } from "../types.js";

import { Execute, } from "./types.js";


export abstract class AbstractLLM {
  // constructor(_model: ModelDefinition) {
  // };

  execute: Execute = () => new Promise(() => { });
}
