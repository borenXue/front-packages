const TerserPlugin = require('terser-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const EnvWebpackPlugin = require('xenv-webpack-plugin')
const MultiPageWebpackPlugin = require('multi-pages-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.js',
    // index: '/Users/xueboren/Documents/github/front-packages/test/webpack5/src/main.js',
    // __multi_pages: '/Users/xueboren/Documents/github/front-packages/packages/xtools.node/lib/webpack/multi-html/html/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[contenthash].js',
  },
  plugins: [
    // new HtmlPlugin({
    //   template: 'public/index.html',
    //   filename: (entryName) => `${entryName}.html`,
    // }),
    // new webpack.DefinePlugin({
    //   xx: '"aa"'
    // }),
    new EnvWebpackPlugin(),
    new MultiPageWebpackPlugin({
      htmlPluginClass: HtmlPlugin
    }),
  ],
  optimization: getOptimization(),
  devServer: {
    port: 9000,
  },
};



function getOptimization() {
  return {
    minimize: true,
    minimizer: [new TerserPlugin({
      minify: undefined,
      // extractComments: 'all',
      terserOptions: {
        format: {
          comments: false,
        },
        compress: {
          drop_console: false,
          drop_debugger: true,
        },
      }
    })],
  };
}


