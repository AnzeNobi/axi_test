module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended'],
  plugins: ['eslint-comments', 'react', 'react-hooks', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': 1,
      },
    },
    {
      files: [
        '*.{spec,test}.{js,ts,tsx}',
        '**/__{mocks,tests}__/**/*.{js,ts,tsx}',
      ],
      env: {
        jest: true,
        'jest/globals': true,
      },
      rules: {
        quotes: [
          1,
          'single',
          { avoidEscape: true, allowTemplateLiterals: true },
        ],
      },
    },
  ],
  rules: {},
};
