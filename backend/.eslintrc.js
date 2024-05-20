module.exports = {
  env: {
    es2023: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'import',
    'node',
    'prettier',
    'promise',
  ],
  rules: {
    'prettier/prettier': 'error',
    // 'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], // Ignore `next` parameter in Express middlewares
    // 'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
}
