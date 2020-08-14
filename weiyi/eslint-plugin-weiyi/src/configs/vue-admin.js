module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
    requireConfigFile: false,
    allowImportExportEverywhere: false,
  },
  env: {
    browser: true,
    node: true,
    // mocha: true,
    // jest: true,
  },
  // globals: {
  //   appBridge: 'readonly',
  //   WeiyiStatSDK: 'readonly',
  // },
  plugins: [
    'vue',
    'prettier',
  ],
  extends: [
    'plugin:vue/essential',
    'standard',
    'prettier',
    'prettier/vue'
  ],
  reportUnusedDisableDirectives: true,
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
}
