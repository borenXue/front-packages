module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    require.resolve('./src/configs/base'),
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/tests/src/rules/*.js'] },
    ],
  },
}
