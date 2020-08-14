const { warn } = require('@vue/cli-shared-utils')

module.exports.getOSSPluginOptions = function (pkgWeiyiOss) {
  let envPrefix = typeof pkgWeiyiOss === 'string' ? pkgWeiyiOss : '';
  const options = {
    exclude: /.*(\.html$|\.map$)/,
    envPrefix,
  };
  if (typeof pkgWeiyiOss === 'object') {
    Object.assign(options, pkgWeiyiOss);
  }
  if (typeof options.exclude === 'string') {
    options.exclude = new RegExp(options.exclude);
  }
  return [options, '//res.wyins.net/auto_upload_ci'];
}

// module.exports.isUpdateMode = function (pkg) {

//   // 直接 vue add wyadmin 的场景
//   if (!pkg.devDependencies || !pkg.devDependencies['vue-cli-plugin-wyadmin']) return false;

//   // 我们儿哦的呐
//   if (!pkg.weiyi || !pkg.weiyi.invokeInited) return false;

//   return true;
// }

module.exports.warn = warn
