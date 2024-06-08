# Autogrammer

Autogrammer constrains the output of language models (LLMs) to generate syntactically valid JSON or SQL. 

By leveraging grammars, Autogrammer ensures that an LLM generates output adhering to specific structures and syntax, even with smaller models. 

some use cases Autogrammer could be used for:

- live code generation in the browser
- natural language to SQL conversion
- generating visualizations from text descriptions
- offline or privacy-focused scenarios. 

Key features:

- **Bring your own model**: Works seamlessly with `Transformers.js`, `web-llm`, and REST endpoints for `llama.cpp` and `llamafile`, allowing you to use your preferred LLM.
- **`JSON` and `SQL` support** with syntactic validity guaranteed by GBNF grammars.
- **Provide schemas** (database schema or JSON schema) to further restrict possible output and ensure semantic correctness.
- (*Coming soon*) **Plugins** enable additional functionality, such as RAG, on-the-fly error correction, and more.

## Installation

```bash
npm install autogrammer
```

## Quickstart

```javascript
import { pipeline } from '@xenova/transformers'
import { Autogrammer } from 'autogrammer'

// Load your preferred model
const model = pipeline('text-generation', 'Xenova/gpt2')

// Create an Autogrammer instance for JSON output
const autogrammer = new Autogrammer({
  language: 'json',
})

// Provide a prompt to the model telling it to generate JSON
const prompt = 'Write me JSON that captures the following address: 1600 Pennsylvania Avenue NW, Washington, DC 20500'

// Execute the prompt with Autogrammer
const response = await autogrammer.execute(prompt)

// Output the generated JSON
console.log(response) // { ... json object }
```

## Packages

Autogrammer is made up of a number of subpackages that each offer a sliver of functionality:

- [`gbnf`](packages/gbnf/README.md) - parses a GBNF grammar into a graph of rules, which can be used to determine the validity of a next token
- [`json2gbnf`](packages/json2gbnf/javascript) - generates a GBNF grammar for JSON, with optional JSON schema
- [`sql2gbnf`](packages/sql2gbnf/javascript) - generates a GBNF grammar for SQL, with optional database schema
- [`contortionist`](packages/contort/README.md) - implements a Logits post-processor that restricts LLM output to only include valid next tokens
- [`autogrammer`](packages/autogrammer/javascript/) - provides top-level support for SQL and JSON grammar generation with arbitrary LLM models.

## License

[MIT](LICENSE)
