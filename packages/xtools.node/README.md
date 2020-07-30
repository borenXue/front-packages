# `xtools.node`

### webpack 多页面助手 `webpackMultiHtml`

* 自定义配置项可参考 [vue-cli-plugin-multi](https://www.npmjs.com/package/vue-cli-plugin-multi) 文档

```javascript
const { webpackMultiHtml } = require('xtools.node');
const [entries, options] = webpackMultiHtml();
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack 需修改 entry && plugins 两个配置项, 示例如下:
// {
//   ......
//   entry: entries,
//   plugins: [
//     ...(options.map(opt => new HtmlWebpackPlugin(opt)))
//   ]
// }

// 启动项目后, 打开 http://localhost:8080/__multi_pages.html 即可查看项目中的页面列表
```
