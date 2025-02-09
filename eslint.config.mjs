import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  stylistic.configs.customize({
    flat: true,
    indent: 2,
    quotes: 'single',
    semi: true,
  }),
  {
    languageOptions: { globals: globals.browser },
    plugins: { '@stylistic/js': stylistic },
    rules: {
      // '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
    },
  },
];
