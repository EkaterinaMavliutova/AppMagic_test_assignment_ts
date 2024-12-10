import globals from "globals";
import tseslint from '@typescript-eslint/eslint-plugin'; // "typescript-eslint";
import typescriptParser from "@typescript-eslint/parser";
import playwright from 'eslint-plugin-playwright';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: [
      'playwright-report',
      'test-results',
    ],
  },
  {
    plugins: {
      '@typescript-eslint': tseslint,
      'playwright': playwright,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        projectService: {
          allowDefaultProject: ['*.mjs'],
        },
      }
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'no-console': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
    }
  }
];
