# `eslint-plugin-weiyi`

> 微易 eslint 插件

## 使用

### 通过 mrm 更新项目配置

⚠️ 注意，该方式会完全覆盖原项目中的 .eslintrc.js 文件内容。

```bash
# 全局安装 mrm
npm i -g mrm
# 应用配置到工程项目
cd <project-root-dir>
mrm lintformat-bxs
```

### 手动 npm 安装

1. npm 5+ 安装插件及其 peerDependencies。

```shell
npx install-peerdeps --dev eslint-plugin-weiyi
```

2. 如示例配置 .eslintrc.js，请根据使用场景选择 config。

```js
module.exports = {
  root: true,
  extends: ['plugin:weiyi/vue-admin'],
}
```

## config

**plugin:weiyi/recommended**:

- 继承 'eslint:recommended', 'airbnb-base', 'prettier'
- 开启[自定义规则](#rules)和 [override](#override)

**plugin:weiyi/vue-recommended**:

- 继承 'eslint:recommended', 'plugin:vue/recommended', '@vue/airbnb', 'prettier', 'prettier/vue'
- 开启自定义规则和 override

**plugin:weiyi/vue-admin**:

- 同 **plugin:weiyi/vue-recommended**
- 面向现代浏览器，babel-parser 使用 `ecmaVersion:2019`。适用于管理后台等桌面端项目。

## rules

**no-dead-protocol**: 禁止在字符串中使用 'http://'。请使用 'https://' 或 '//'。  
**vue-no-dead-protocol**: 同上，包括检查 vue template 中的使用。  
**no-third-party-res**: 禁止引用第三方 CDN 资源。请使用 'assets.winbaoxian.com' 镜像（[howto](http://wy-front.git-page.winbaoxian.com/fed-gitbooks/quick-guide/development/static-resource.html#%E7%AC%AC%E4%B8%89%E6%96%B9%E4%BB%A3%E7%A0%81%E8%B5%84%E6%BA%90)）。  
**vue-no-third-party-res**: 同上，包括检查 vue template 中的使用。

## override

```js
rules: {
  // 生产环境不使用 console 和 debugger 调试语句
  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  // 允许使用 hoist，支持任意安排 function 定义顺序
  'no-use-before-define': 'off',
  // 允许使用自增、自减运算
  'no-plusplus': 'off',
  // parseInt 十进制数字时不指定 radix 参数
  radix: ['error', 'as-needed'],
  // 不使用结尾分号，自动处理特殊情形
  semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
  // 不允许未使用的表达式，但允许逻辑运算符和三元运算符的短路逻辑控制
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
    },
  ],
  // 不允许隐式数据类型转换，始终使用 Number(foo), String(bar) 等
  'no-implicit-coercion': 'error',
  // 不允许在类、对象上下文之外使用不知所指的 this
  'no-invalid-this': 'error',
},
```
