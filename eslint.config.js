import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

const SLICE_LAYERS = ['pages', 'widgets', 'features', 'entities'];
const LAYERS = ['app', ...SLICE_LAYERS, 'shared'];

const sliceLayersBelow = (layer) =>
  SLICE_LAYERS.filter((l) => LAYERS.indexOf(l) > LAYERS.indexOf(layer));

// Относительные пути задаются как «не алиас»: micromatch не матчит './x' и '../../x'
// шаблонами './**' / '../**'
const ALIAS_SOURCE = '~*/**';
const NOT_ALIAS_SOURCE = '!~*/**';

const publicApi = { file: { path: 'src/*/*/index.{ts,tsx}' } };

export default [
  { ignores: ['dist'] },

  js.configs.recommended,

  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      boundaries,
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        typescript: {
          // Относительный путь резолвится от cwd процесса ESLint, а в IDE cwd
          // может не совпадать с корнем проекта
          project: `${import.meta.dirname}/tsconfig.app.json`,
        },
      },

      'boundaries/elements': [
        { type: 'app', pattern: 'src/app', partialMatch: false },
        {
          type: 'pages',
          pattern: 'src/pages/*',
          partialMatch: false,
          capture: ['slice'],
        },
        {
          type: 'widgets',
          pattern: 'src/widgets/*',
          partialMatch: false,
          capture: ['slice'],
        },
        {
          type: 'features',
          pattern: 'src/features/*',
          partialMatch: false,
          capture: ['slice'],
        },
        {
          type: 'entities',
          pattern: 'src/entities/*',
          partialMatch: false,
          capture: ['slice'],
        },
        { type: 'shared', pattern: 'src/shared', partialMatch: false },
      ],
    },

    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          checkInternals: true,
          policies: [
            {
              from: { element: { type: 'app' } },
              allow: {
                to: [
                  {
                    element: { types: { anyOf: sliceLayersBelow('app') } },
                    ...publicApi,
                  },
                  { element: { type: 'shared' } },
                ],
              },
            },
            {
              from: { element: { type: 'pages' } },
              allow: {
                to: [
                  {
                    element: { types: { anyOf: sliceLayersBelow('pages') } },
                    ...publicApi,
                  },
                  { element: { type: 'shared' } },
                ],
              },
            },
            {
              from: { element: { type: 'widgets' } },
              allow: {
                to: [
                  {
                    element: { types: { anyOf: sliceLayersBelow('widgets') } },
                    ...publicApi,
                  },
                  { element: { type: 'shared' } },
                ],
              },
            },
            {
              from: { element: { type: 'features' } },
              allow: {
                to: [
                  {
                    element: { types: { anyOf: sliceLayersBelow('features') } },
                    ...publicApi,
                  },
                  { element: { type: 'shared' } },
                ],
              },
            },
            {
              from: { element: { type: 'entities' } },
              allow: { to: { element: { type: 'shared' } } },
            },

            // Политики стиля путей. При конфликте побеждает последняя совпавшая,
            // поэтому порядок важен: запрет → исключение для internal → запрет алиаса внутри слайса
            {
              to: { element: { types: { anyOf: LAYERS } } },
              disallow: { dependency: { source: NOT_ALIAS_SOURCE } },
              message:
                'Импорт из другого слайса или слоя — только через алиас (~layer/slice), без относительных путей',
            },
            {
              allow: { dependency: { relationship: { to: 'internal' } } },
            },
            {
              from: { element: { types: { anyOf: SLICE_LAYERS } } },
              disallow: {
                dependency: {
                  relationship: { to: 'internal' },
                  source: ALIAS_SOURCE,
                },
              },
              message:
                'Внутри слайса используйте относительный импорт вместо алиаса',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',

      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],
    },
  },

  { ...reactRefresh.configs.vite, files: ['**/*.{jsx,tsx}'] },

  {
    files: ['src/app/main.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  prettier,
];
