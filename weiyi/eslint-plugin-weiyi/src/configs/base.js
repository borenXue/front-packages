module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  reportUnusedDisableDirectives: true,
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    radix: ['error', 'as-needed'],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-implicit-coercion': 'error',
    'no-invalid-this': 'error',
  },
}
