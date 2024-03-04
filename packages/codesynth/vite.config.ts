import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'umd'],
      name: 'CodeSynth',

    }
    // rollupOptions: {
    //   // https://rollupjs.org/configuration-options/
    //   input: `src/index.ts`,
    //   output: [
    //     {
    //       file: `./dist/index.js`,
    //       format: 'esm',
    //       sourcemap: true,
    //       exports: 'default',
    //     },
    //   ]
    // },
  },
  plugins: [dts()],
  test: {
    include: ['**/*.test.ts'],
    globals: true,
    // ts
    typecheck: {
      tsconfig: './tsconfig.test.json',
    }
  },
})
