# CodeSynth

CodeSynth is a JS library for generating syntactically valid code from an LLM. It achieves this by leveraging grammars to restrain LLM tokens.

## Quickstart

```javascript
const synth = new Codesynth({
  language: 'json', // specify the language
  model: { // specify the model backend
    protocol: 'llama.cpp',
    endpoint: '/some/path/to/llama.cpp/server',
  }
});
const result = await synth.synthesize(prompt, {
  n: 100, // max number of tokens
  stream: true, // whether to stream or not
  streamCallback: ({ chunk, partial }) => {
    console.log(partial) // if streaming, the partially created string output
    console.log(chunk) // the full chunk output from the LLM
  }
});
```

## Supported Languages

- JSON

Support is planned for SQL, Python, and Javascript.

## Supported LLMs

Currently the following LLM frameworks are supported:

- llama.cpp
