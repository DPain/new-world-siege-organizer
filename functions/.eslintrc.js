module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: [
    '.eslintrc.js', // Ignore itself.
    '/lib/**/*', // Ignore built files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    "space-before-function-paren": 0,
    '@typescript-eslint/no-var-requires': 0,
    'import/no-unresolved': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'new-cap': ['error', { 'capIsNew': false }],
    'indent': ['error', 2],
    'valid-jsdoc': 0,
    'max-len': ['warn', { 'code': 80, 'tabWidth': 2, 'ignoreUrls': true, 'ignoreComments': true, 'ignoreTrailingComments': true, 'ignoreStrings': true, 'ignoreTemplateLiterals': true}],
  },
};