// module.exports = {
//   root: true,
//   env: {
//     node: true,
//     es6: true,
//     jest: true,
//   },
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     sourceType: 'module',
//     ecmaVersion: 'latest',
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   ignorePatterns: ['node_modules/*', '.out/*'],
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//   ],
//   settings: {
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       },
//     },
//   },
//   plugins: ['react', 'typescript', '@typescript-eslint/eslint-plugin'],
//   rules: {
//     '@typescript-eslint/interface-name-prefix': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//     'react/jsx-filename-extension': 'off',
//   },
// };
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 12 }, // 開啟 es2021 https://eslint.org/docs/user-guide/configuring/language-options
  ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'], // 忽略文件
  extends: ['eslint:recommended'], // 核心規則
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: { react: { version: 'detect' } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:react/recommended', // React rules
        'plugin:react-hooks/recommended', // React hooks rules
        'plugin:jsx-a11y/recommended', // Accessibility rules
      ],
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
      },
    },
  ],
};
