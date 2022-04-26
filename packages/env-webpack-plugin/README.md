# `env-webpack-plugin`

> 借助 webpack.DefinePlugin 自动注入 config/[X_ENV].js

## Usage

* 第一步: 构建时配置 `X_ENV` 环境变量, 代表当前打包的环境: 测试环境、预发布环境、线上环境 ......
* 第二步: 项目中新增文件: `config/${X_ENV}.js`, 该文件导出一个 javascript 对象
* 第三步: webpack 配置中添加该插件配置


### 配置测试环境示例

* 1、npm-script build:test 配置: `cross-env X_ENV=test webpack`
* 2、新增配置文件 `config/test.js`, 内容参考下方:
* 3、webpack 配置添加该插件
* 4、运行打包: `npm run build:test`

```javascript
// package.json 脚本命令配置:
{
  "scripts": {
    "build:test": "cross-env X_ENV=test webpack"
  }
}

// 新增 config/test.js 文件:
module.exports = {
  version: 3,
  baseUrl: 'https://xxx-test.yyy.cn',
  arr: ['value-1', 'value-2'],
  sso: {
    login: 'https://login-test.yyy.cn',
  },
};

// webpack.config.js 文件配置:
const EnvWebpackPlugin = require('env-webpack-plugin');
module.exports = {
  ...,
  plugins: [
    new EnvWebpackPlugin(),
  ],
};

// 在 src/index.js 中使用环境变量
console.log(process.env.version); // 数字类型: 3
console.log(process.env.baseUrl); // 字符串类型: https://xxx-test.yyy.cn
console.log(process.env.arr); // 数组类型: ['value-1', 'value-2']
console.log(process.env.sso.login); // 字符串类型: https://login-test.yyy.cn

console.log(process.env); // 对象类型: { X_ENV: 'test', version: 3, ... }
console.log(process.env.X_ENV); // 字符串类型: 'test' 【不需要在 config/test.js 中导出, 会自动注入】
console.log(process.env.sso); // 对象类型: { login: 'https://login-test.yyy.cn' }
```

## 配置

const EnvWebpackPlugin = require('env-webpack-plugin');
module.exports = {
  ...,
  plugins: [
    new EnvWebpackPlugin(),
  ],
};


