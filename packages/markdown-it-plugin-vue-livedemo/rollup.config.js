const path = require('path');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve');
const scss = require('rollup-plugin-scss');
const postcss = require('rollup-plugin-postcss');
const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = {
  input: resolve('./src/index.ts'),
  output: {
    file: resolve('./', pkg.main), // 为了项目的统一性，这里读取 package.json 中的配置项
    format: 'cjs',
  },
  external: ['fs', 'path', '@vue/component-compiler', 'lz-string'],
  plugins: [
    scss(),
    postcss({
      plugins: [require('autoprefixer')()]
    }),
    nodeResolve.default({
      extensions,
      modulesOnly: true,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
};