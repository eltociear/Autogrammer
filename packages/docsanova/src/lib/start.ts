import Mustache from 'mustache';
import {
  Eleventy,
} from "@11ty/eleventy";
import chokidar from 'chokidar';
import pkg from 'fs-extra';
const {
  existsSync,
  mkdirp,
  unlink,
  // realpath,
  // symlink,
} = pkg;
import os from 'os';

export interface StartOpts extends Opts {
  port: number;
  tmpRoot: string;
}

import path from 'path';
import * as url from 'url';
// import { RollupWatcher, } from './utils/rollup.js';
import { Opts, } from './types.js';
import { getCreateFile, } from './utils/get-create-file.js';
import { getPromise, } from './utils/get-promise.js';
import { isExcluded, } from './utils/is-excluded.js';
import { TSCWatcher, } from './utils/tsc.js';
import {
  symlinkNodeModules,
} from './utils/symlink-node-modules.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const ROOT = path.resolve(__dirname, "../../");
const CONTENT = path.resolve(ROOT, "content");
const JS = path.resolve(ROOT, "js");

const rand = Math.random().toString(36);
export const start = async ({
  port,
  input: inputDir,
  contentDir,
  srcDir,
  tmpRoot = path.resolve(os.tmpdir(), rand),
  nodeModulesDir = '_nm',
}: StartOpts) => {
  if (!inputDir) {
    throw new Error('No input specified');
  }
  const tmpInput = path.resolve(tmpRoot, 'input');
  const tmpOutput = path.resolve(tmpRoot, 'output');
  const createFile = getCreateFile(inputDir);
  await Promise.all([
    mkdirp(tmpInput),
    mkdirp(tmpOutput),
  ]);

  // For monitoring individual files
  const [ready, readyCallback,] = getPromise();
  let written = 0;
  [
    {
      input: path.resolve(inputDir, 'docsanova.json'),
      output: path.resolve(tmpInput, '_data/docsanova.json'),
    },
    {
      input: path.resolve(ROOT, 'eleventy.config.cjs.mustache'),
      output: path.resolve(tmpInput, 'eleventy.config.cjs'),
    },
  ].forEach(({ input, output, }) => {
    if (!(existsSync(input))) {
      throw new Error(`File ${input} does not exist`);
    }
    chokidar.watch(input).on('all', (
      event,
      // inputFilepath,
    ) => {
      // console.log('event', event, input);
      if (event === 'add' || event === 'change') {
        written += 1;
        if (written >= 2) {
          readyCallback();
        }
        void createFile(input, output, contents => Mustache.render(contents, {
          tmpInput,
          tmpOutput,
          NODE_MODULES_FOLDER: nodeModulesDir,
          STYLES_FOLDER: 'styles',
          INTERNAL_JS_FOLDER: '_internal_js',
          JS_FOLDER: 'js',
        }));
      } else if (!['addDir',].includes(event)) {
        console.log(event, path);
      }
    });
  });

  await symlinkNodeModules(inputDir, tmpInput, nodeModulesDir);

  // For monitoring directories
  [
    {
      input: path.resolve(inputDir, contentDir),
      output: tmpInput,
    },
    {
      input: path.resolve(inputDir, srcDir, 'pages'),
      output: tmpInput,
      transform: (content: string) => `
{% extends "layouts/base.html" %} 
{% block content %}
${content}
{% endblock %}
`,
    },
    {
      input: path.resolve(ROOT, CONTENT),
      output: tmpInput,
    },
    {
      input: path.resolve(ROOT, JS),
      output: path.resolve(tmpInput, '_internal_js'),
    },
    {
      input: path.resolve(inputDir, srcDir, 'styles'),
      output: path.resolve(tmpInput, 'styles'),
    },
    {
      input: path.resolve(inputDir, '.docsanova/js'),
      output: path.resolve(tmpInput, 'js'),
    },
    // ...Object.keys(dependencies).filter(name => {
    //   return !['docsanova'].includes(name);
    // }).map((dir) => ({
    //   input: path.resolve(inputDir, `node_modules/${dir}`),
    //   output: path.resolve(tmpInput, `.node_modules/${dir}`),
    // })),
  ].forEach(({ input, output, transform, }: { input: string; output: string; transform?: (content: string) => string; }) => {
    chokidar.watch(input, {
      ignorePermissionErrors: false,
    }).on('all', (event, inputFilepath) => {
      // if (
      //   inputFilepath.includes('packages/autogrammer/docs/node_modules/autogrammer')
      //   && !inputFilepath.includes('packages/autogrammer/docs/node_modules/autogrammer/node_modules')
      // ) {
      //   console.log(inputFilepath.slice(58), !isExcluded(inputFilepath));
      // }
      if (!isExcluded(inputFilepath)) {
        // console.log('event', event, inputFilepath);
        if (event === 'add' || event === 'change') {
          const filepath = inputFilepath.split(`${input}/`)[1];
          const outputFilepath = path.resolve(tmpInput, output, filepath);
          // console.log('event', event, inputFilepath, outputFilepath);
          void createFile(inputFilepath, outputFilepath, transform);
        } else if (event === 'unlink') {
          const filepath = inputFilepath.split(`${input}/`)[1];
          const outputFilepath = path.resolve(tmpInput, output, filepath);
          void unlink(outputFilepath);
        } else if (!['addDir',].includes(event)) {
          console.log(event, path);
        }
      }
    });
  });


  new TSCWatcher(inputDir);

  await ready;
  const elev = new Eleventy(tmpInput, tmpOutput, {
    source: "cli",
    runMode: 'serve',
    quietMode: false,
    configPath: path.resolve(tmpInput, 'eleventy.config.cjs'),
    // pathPrefix: undefined,
    // dryRun: false,

  });
  await elev.init();
  await elev.watch();
  elev.serve(port);
};

