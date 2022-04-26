const path = require('path');
const fs = require('fs');

const defaultConfig = {
  envKey: 'X_ENV',
  defaultEnv: 'development',
  dir: 'config',
};

module.exports = class EnvWebpackPlugin {

  config = defaultConfig;

  constructor(cfg) {
    this.config = { ...defaultConfig, ...(cfg || {}) };
  }

  apply(compiler) {  
    const envs = this.calcFinalEnvs(compiler.context);

    const defines = {
      'process.env': JSON.stringify(envs),
    };
    this.pickUpObject(envs, defines);

    // console.log('defines: ', defines)

    const DefinePlugin = compiler.webpack.DefinePlugin;
    new DefinePlugin(defines).apply(compiler)
  }

  calcFinalEnvs(context) {
    const envValue = process.env[this.config.envKey] || this.config.defaultEnv;
    const dir = path.resolve(context, this.config.dir);
    const filepath = path.resolve(dir, `${envValue}.js`)

    // 检查 config/env.js 文件是否存在
    const fileEixst = fs.existsSync(filepath);
    if (!fileEixst) {
      console.warn(`配置文件 ${filepath} 不存在...`);
    }

    let envConfig = {
      // NODE_ENV: process.env.NODE_ENV || 'development', // webpack 内置注入的, 无需单独注入
    };
    try {
      envConfig = require(filepath);
    } catch(err) {
      envConfig = {};
      console.warn(`配置文件 ${filepath} 解析失败 - require(${filepath})`, err)
    }
    envConfig[this.config.envKey] = envValue;

    return envConfig;
  }

  pickUpObject(obj, resultObject, prefix = 'process.env') {
    // console.log('pickUpObject: ', obj, prefix);
    for (let key in obj) {
      const val = obj[key];
      resultObject[`${prefix}.${key}`] = JSON.stringify(val);
      // 对象类型(不含数组): 递归处理
      if (typeof val === 'object' && !(val instanceof Array)) {
        this.pickUpObject(val, resultObject, `${prefix}.${key}`);
      }
    }
  }

};
