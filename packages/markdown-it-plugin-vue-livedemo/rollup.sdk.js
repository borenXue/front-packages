const path = require('path');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve');
const scss = require('rollup-plugin-scss');
const postcss = require('rollup-plugin-postcss');
const commonjs = require('@rollup/plugin-commonjs');
const pkg = require('./package.json');

const extensions = ['.js', '.ts', '.scss', '.css'];

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = {
  input: resolve('./src/browser-sdk.ts'),
  output: {
    file: resolve('./', pkg.browserSdk),
    format: 'iife',
    name: 'MarkdownItVueLiveDemo',
  },
  external: [
    'highlight.js',
  ],
  plugins: [
    scss(),
    postcss({
      plugins: [require('autoprefixer')()]
    }),
    commonjs(),
    nodeResolve.default({ extensions }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
};