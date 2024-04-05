import Codesynth from '../../../packages/codesynth/src/index.js';

const synth = new Codesynth({
  language: 'sql',
  model: {
    protocol: 'llama.cpp',
    endpoint: import.meta.env.VITE_LLAMACPP_ENDPOINT_URL,
  }
});

let abortController: AbortController = new AbortController();

const form = document.getElementById('form');
const button = document.getElementById('submit');
const input = document.getElementById('input') as HTMLTextAreaElement;
const output = document.getElementById('output');

form.onsubmit = async (e) => {
  e.preventDefault();
  await synthesize(input.value);
};


const synthesize = async (prompt: string) => {
  button.setAttribute('disabled', '');
  const result = await synth.synthesize(prompt, {
    selectlist: ['foo', 'bar', 'bar2', 'foo2', 'userid', 'username', 'created', 'modified'],
    tablename: ['baz'],
  }, {
    n: 400,
    stream: true,
    streamCallback: ({ partial }) => {
      output.textContent = partial;
    }
  });

  button.removeAttribute('disabled');
  abortController = new AbortController();
};

synthesize(input.value);
