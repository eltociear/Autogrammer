module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "ignorePatterns": [
    "**/*.test.ts",
    "**/__mocks__/**/*.ts",
    "**/__fixtures__/**/*.ts",
    "tests/**/*.ts",
    "dev/**/*.ts",
  ],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/semi": ["error", "always"],
    "comma-dangle": ["error", "always"],
    "curly": ["error", "all"],
    "no-empty": [
      "error",
      {
        "allowEmptyCatch": true
      }
    ],
  },
  overrides: [
    {
      files: ['*.ts'],

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      "parserOptions": {
        "project": "./tsconfig.json",
        "sourceType": "module"
      },
    },
  ],
};
