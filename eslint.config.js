import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

// Слои со слайсами, сверху вниз (app и shared слайсов не имеют)
const SLICE_LAYERS = ['pages', 'widgets', 'features', 'entities'];
const LAYERS = ['app', ...SLICE_LAYERS, 'shared'];

const sliceLayersBelow = (layer) =>
  SLICE_LAYERS.filter((l) => LAYERS.indexOf(l) > LAYERS.indexOf(layer));

// Публичный API слайса — только его корневой index.ts
const publicApi = { file: { path: 'src/*/*/index.{ts,tsx}' } };

export default [
  { ignores: ['dist'] },

  js.configs.recommended,

  // Строгий набор с проверкой типов — только для TS-файлов.
  // no-explicit-any и no-unsafe-* запрещают any как явно, так и «утечкой» из нетипизированного кода.
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: 'module',
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
          project: './tsconfig.app.json',
        },
      },

      // partialMatch: false — паттерн матчится от корня проекта, а не с конца пути.
      // app и shared — слои без слайсов (только сегменты), остальные слои делятся на слайсы.
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
      'import/no-unresolved': 'error',

      // Импорты только сверху вниз. Импорты между слайсами одного слоя
      // запрещены через default: 'disallow'; импорты внутри слайса не проверяются.
      // В слайсы pages/widgets/features/entities — только через публичный API (index.ts).
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
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
          ],
        },
      ],
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Эти проверки дублирует компилятор TS, а в eslint-plugin-import они медленные
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',

      // Разрешает `onClick={() => setState(x)}` — стандартный паттерн обработчиков в React
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],
    },
  },

  {
    // #root гарантированно есть в index.html — non-null assertion в точке входа допустим
    files: ['src/app/main.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Последним — отключает правила, конфликтующие с Prettier
  prettier,
];
