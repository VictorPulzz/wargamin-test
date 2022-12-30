module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    // typescript
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/no-empty-interface': 'off',

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
      },
      {
        selector: 'parameter',
        format: null,
        filter: {
          regex: '^_$',
          match: true,
        },
      },
      {
        selector: 'typeParameter',
        prefix: ['T'],
        format: null,
      },
    ],

    'no-plusplus': 'off',
    'arrow-body-style': 'off',
    "no-empty": "off",
    "no-console": "off",
    "no-bitwise": "off",
    "no-nested-ternary":  "off",
  
    // imports routine
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports-ts': 'error',
    "import/no-default-export": "off",
    "import/no-named-as-default": "off",
    'import/no-duplicates': 'off',
    'import/no-cycle': 'off',

    // allow only named exports for IDEs autocomplete
    'import/prefer-default-export': 'off',

    // react
    "react/jsx-no-useless-fragment": "off",
    "react/jsx-no-target-blank": "off",
    "react/no-unstable-nested-components":  "off",
    "react/destructuring-assignment": "off",
    'react/no-array-index-key': 'off',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
      },
    ],
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],

    'prefer-destructuring': 'off',

    'prettier/prettier': 'error',

    // immer uses reassign
    'no-param-reassign': 'off',

    // use optional chaining instead
    '@typescript-eslint/no-non-null-assertion': 'error',

    'max-classes-per-file': 'off',

    'global-require': 'off',

    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/*.stories.*",
          "**/.storybook/**/*.*"
        ],
        "peerDependencies": true
      }
    ],
    
    // jsx-a11y
    "jsx-a11y/interactive-supports-focus": "off",
    "jsx-a11y/click-events-have-key-events":  "off",
    "react/button-has-type":  "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": [""]
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
