const fs = require('fs');
const path = require('path');
const WebpackAliossPlugin = require('webpack-alioss-plugin');
const WebpackStylelintPlugin = require('stylelint-webpack-plugin');
const { getOSSPluginOptions } = require('../helper');

module.exports = function VueCliPluginWyadmin(api, projectOptions) {
  const context = api.getCwd();
  const pkg = require(path.resolve(context, './package.json'));

  // 集成 stylelint-webpack-plugin 插件
  api.chainWebpack((webpackConfig) => {
    webpackConfig.plugin('stylelint')
      .use(WebpackStylelintPlugin, [{
        files: '**/*.{html,vue,css,sass,scss,less}',
        cache: true,
        fix: true,
        globbyOptions: { gitignore: true },
      }])
  })

  // 集成 webpack-alioss-plugin 插件
  if (process.env.NODE_ENV === 'production' && pkg && pkg.weiyi && pkg.weiyi.oss) {
    const [options] = getOSSPluginOptions(pkg.weiyi.oss)
    api.chainWebpack((webpackConfig) => {
      webpackConfig.plugin('alioss')
        .use(WebpackAliossPlugin, [options]);
    })
  }

}
