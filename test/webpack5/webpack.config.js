const TerserPlugin = require('terser-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const EnvWebpackPlugin = require('xenv-webpack-plugin')

const optimization = {
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

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[contenthash].js',
  },
  optimization,
  devServer: {
    port: 9000,
  },
  plugins: [
    new HtmlPlugin({
      template: 'public/index.html',
      filename: (entryName) => `${entryName}.html`,
      // filename: 'index.html'
    }),
    // new webpack.DefinePlugin({
    //   xx: '"aa"'
    // }),
    new EnvWebpackPlugin(),
  ],
};


