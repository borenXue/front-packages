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
    'weiyi/vue-no-dead-protocol': 'error',
    'weiyi/vue-no-third-party-res': [
      'error',
      ['winbaoxian.(cn|com)'],
      ['.(gif|png|jpg|jpeg|webp|js|css|json)$'],
    ],
  },
}
