# `eslint-plugin-weiyi`

> 微易 eslint 插件

使用

```shell

# 安装依赖
npm i -D eslint prettier babel-eslint eslint-plugin-vue eslint-config-prettier eslint-config-standard eslint-plugin-prettier

npm i -D eslint-plugin-weiyi

# 配置文件 .eslintrc.js 如下
module.exports = {
  root: true,
  extends: ['plugin:weiyi/vue-admin']
}

```

<!--
## 使用

vue-cli-plugin-eslint 插件会安装以下依赖 && 并统一版本:

npm i -D eslint babel babel-eslint eslint-config-standard
npm i -D vue-eslint-parser eslint-plugin-vue
npm i -D prettier eslint-config-prettier eslint-plugin-prettier

npm i -D eslint babel babel-eslint eslint-config-standard vue-eslint-parser eslint-plugin-vue prettier eslint-config-prettier eslint-plugin-prettier



peerDependencies:

* 不包含 eslint、prettier: eslint-plugin-vue/prettier 对对应的 peerDependencies
* 不包含 babel: webpack 环境下可以不需要 babel, 有 babel-loader 即可
* 不包含 vue-eslint-parser: vue-plugin-vue 的 dependencies 中包含



代码中的注释:

/*eslint no-global-assign: "error"*/
/*eslint-env browser*/
/*global a:readonly*/
/*global a:writable*/
/* eslint quotes: ["error", "double"], curly: 2 */
/* eslint-disable no-alert, no-console */
/* eslint-disable-next-line */
/* eslint-disable-line */
-->
