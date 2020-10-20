module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2019,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  extends: [require.resolve('./vue-recommended')],
}
