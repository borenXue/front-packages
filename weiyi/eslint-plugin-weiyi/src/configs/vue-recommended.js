module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/airbnb',
    'prettier',
    'prettier/vue',
    require.resolve('./base'),
    require.resolve('./weiyi'),
  ],
  rules: {
    'import/extensions': ['error', { vue: 'never' }],
  },
}
