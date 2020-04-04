# vue-cli-plugin-config

* 读取 `config/${process.env.X_ENV || 'development'}.env.js` 文件
  * 该文件导出普通的 js 对象即可, 不需要特别处理 string 类型, eg: `module.exports = { BASE_API: '//api.baidu.com' }`
* 使用 `webpack.DefinePlugin` 将导出的配置挂载到变量 `process.env`
* `process.env` 的最终值如下:

```js
new webpack.DefinePlugin({
  'process.env': {
    /**
     * 第一部分: vue-cli 默认设置
     */
    BASE_PATH: '',
    // ...其他, eg: VUE_APP_ 开头的环境变量
    /**
     * 第二部分: 默认新增的
     */
    NODE_ENV: process.env.NODE_ENV || 'development',
    X_ENV: process.env.X_ENV || 'development',
    PKG_VERSION: '', // 读取 package.json 中的 version 属性
    PKG_NAME: '', // 读取 package.json 中的 name 属性
    /**
     * 第三部分: `config/${process.env.X_ENV || 'development'}.env.js` 文件的导出
     */
    // ... 取决于用户配置
  }
})
```
