import globals from 'globals';
import eslint from '@eslint/js';

import stylisticPlugin from '@stylistic/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParcer from '@typescript-eslint/parser';

import typescriptRules from './rules/eslint-typescript.js';
import stylisticRules from './rules/eslint-stylistic.js';
import reactRules from './rules/eslint-react.js';
import reactHooksRules from './rules/eslint-react-hooks.js';
import javascriptRules from './rules/eslint-javascript.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            react: reactPlugin,
            '@typescript-eslint': typescriptPlugin,
            'react-hooks': reactHooksPlugin,
            '@stylistic': stylisticPlugin,
        },
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        languageOptions: {
            parser: typescriptParcer,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        ignores: ['node_modules', 'dist'],
    },
    eslint.configs.recommended,
    ...typescriptRules,
    ...reactHooksRules,
    ...reactRules,
    ...javascriptRules,
    ...stylisticRules,

];
