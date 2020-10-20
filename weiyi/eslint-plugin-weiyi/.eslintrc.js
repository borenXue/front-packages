module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    require.resolve('./src/configs/base'),
  ],
}
