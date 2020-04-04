import fs from 'fs';
import path from 'path';

module.exports = function VueCliPluginConfig(api: any, projectOptions: any) {
  if (!process.env.X_ENV) process.env.X_ENV = 'development';

  const context = api.getCwd();
  const file = path.resolve(context, `config/${process.env.X_ENV}.env.js`);
  const pkg = require(path.resolve(context, 'package.json'));

  if (!fs.existsSync(file)) throw new Error(`配置文件不存在: config/${process.env.X_ENV}.env.js`)

  const infos = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    X_ENV: process.env.X_ENV,

    PKG_VERSION: pkg.version,
    PKG_NAME: pkg.name,

    ...require(file),
  };

  autoTransform(infos);

  api.chainWebpack((webpackConfig: any) => {
    webpackConfig.plugin('define')
      .init((plugin: any, args: any) => {
        if (!args) args = [];
        if (args.length === 0) args[0] = {};
        if (!args[0]['process.env']) args[0]['process.env'] = {};
        args[0]['process.env'] = Object.assign(
          args[0]['process.env'],
          infos,
        );
        return new plugin(...args);
      });
  });
}

/**
 * 使用 JSON.stringify 来包装所有 string 类型的值
 */
function autoTransform(objectOrArray: any) {
  if (typeof objectOrArray === 'object') { // 数组或对象
    if (objectOrArray instanceof Array) { // 处理数组
      objectOrArray.forEach((item, idx) => {
        if (typeof item === 'string') {
          objectOrArray[idx] = JSON.stringify(item)
        } else if (typeof item === 'object') { // 数组或对象
          objectOrArray[idx] = autoTransform(item)
        }
      })
    } else { // 处理对象
      for (const key in objectOrArray) {
        if (typeof objectOrArray[key] === 'string') {
          objectOrArray[key] = JSON.stringify(objectOrArray[key])
        } else if (typeof objectOrArray[key] === 'object'){ // 数组或对象
          objectOrArray[key] = autoTransform(objectOrArray[key])
        }
      }
    }
  }
  return objectOrArray
}
