import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import angularEslintPlugin from '@angular-eslint/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@angular-eslint/recommended',
    pluginJs.configs.recommended,
    tsEslint.configs.recommended,
    'plugin:prettier/recommended',
    eslintConfigPrettier,
  ],
  parser: tsParser,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: {
    '@typescript-eslint': tsEslint,
    '@angular-eslint': angularEslintPlugin,
    prettier: eslintPluginPrettier,
  },
  rules: {
    'no-console': ['warn', { allow: ['error'] }],
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'eqeqeq': ['error', 'always'],
    'semi': ['error', 'never'],
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        singleQuote: true,
        printWidth: 80,
        bracketSpacing: false,
        semi: false,
      }
    ],
  },
};
