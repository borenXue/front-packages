module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    require.resolve('./base'),
    require.resolve('./weiyi'),
  ],
}
