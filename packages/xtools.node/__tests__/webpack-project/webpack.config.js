const path = require('path');
const process = require('process');
const { webpackMultiHelper } = require('../../lib/index');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('cwd: ', process.cwd())

const [entries, options] = webpackMultiHelper()

module.exports = {
  mode: 'development',
  // entry: {
  //   index: './src/main.js',
  // },
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: options.map(item => new HtmlWebpackPlugin(item)),
}
