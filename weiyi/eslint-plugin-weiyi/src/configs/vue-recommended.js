
module.exports = {
  extends: require.resolve('./recommended.js'),
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'weiyi/vue-no-dead-protocol': 'error',
    'weiyi/vue-no-third-party-res': [
      'error',
      ['winbaoxian\.(cn|com)'],
      ['\.(gif|png|jpg|jpeg|webp|js|css|json)$']
    ],
  }
}
