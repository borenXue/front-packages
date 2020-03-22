# `vue-cli-plugin-multi`

> vue-cli 多页面插件

* 1、自动填充 `vue.config.js` 中的 `pages` 多页面属性
* 2、自动生成导航页 `__multi_pages.html` (非`production`模式下生效)
* 3、支持自定义每个页面的 `title`、`chunks` 等额外信息 (支持正则表达式匹配页面)

## 使用示例 - 常规用法

```bash
# step one: 创建项目
vue create your-project
# step two: 安装插件
npm i -D vue-cli-plugin-multi

# step three: 启动并测试
npm run serve  # 访问 http://localhost:8080/__multi_pages.html 查看页面列表


# step four: 添加多个页面
mkdir src/pages/demo1 && touch src/pages/demo1/demo1.js
mkdir src/pages/demo2 && touch src/pages/demo2/demo2.js
mkdir src/pages/demo3 && touch src/pages/demo3/index.js

# step five: 重新启动并测试
npm run serve # 访问 http://localhost:8080/__multi_pages.html 查看页面列表
```

## `vue.config.js` 自定义配置参数说明:

```javascript
module.exports = {
  // 以下配置示例 均为 默认值
  pluginOptions: {
    multi: {

      // 多页面入口所在的 目录 或 目录列表
      pagesDir: 'src/pages',  // 格式: 字符串、字符串数组

      // 入口文件后缀名列表 (.d.ts文件会被强制忽略)
      suffix: ['js', 'ts'],   // 格式: 字符串数组
  
      // 默认的公共模板 HTML 文件
      baseTemplate: 'public/index.html',

      // 额外的页面入口, 默认 `src/main.js` 文件会被打包为 `index.html`
      //
      // 格式: [
      //  ['entry-file', 'output-file'],
      //  ['entry-file', 'output-file']
      // ]
      //
      // entry-file: 为每个页面的入口文件, eg: src/main.js
      // output-file: 为每个页面的输出文件, eg: index.html   或  main/index.html
      additionalEntries: [
        ['src/main.js', 'index.html'],
      ],

      // 自定义每个页面对应的 HtmlWebpackPlugin 实例的参数
      htmlExtra: {},
    },
  },
};
```

### 多页面生成规则

* `src/pages/demos/demo1/demo1.js`: 会生成 `demos/demo1.html`
* `src/pages/demos/demo1/index.js`: 会生成 `demos/demo1/index.html`

### 模板文件判定规则

如何为一个入口文件确定其使用哪个模板文件, 按以下规则进行查找, 按优先级从高往低: (以 src/pages/demo/child/grandc-child)

- 1、htmlExtra 中为该页面指定的模板 (包含 `__public` 配置项)
- 2、该页面的 入口文件 所在目录的 同名 html 文件
- 3、该页面的 入口文件 所在目录中的 `index.html`
- 4、递归 查找该页面的入口文件 所在目录的上级目录中的 `index.html`, 直至项目根目录下的 `index.html`
- 5、使用 `baseTemplate`

### htmlExtra 配置规则

```javascript
module.exports = {
  // 以下配置示例 均为 默认值
  pluginOptions: {
    multi: {
      // 自定义每个页面对应的 HtmlWebpackPlugin 实例的参数
      htmlExtra: {

        // `__public` 为公共配置: 所有页面默认继承 `__public` 配置
        __public: {
          title: '默认标题', // <title><%= htmlWebpackPlugin.options.title %></title>
          BASE_URL: './', // <link rel="icon" href="<%= BASE_URL %>favicon.ico">
        },
        // 自定义: 所有 demos 目录下的页面
        // BASE_URL 自动继承 `__public` 公共配置
        '^demos/': {
          title: '测试页的标题',
          icon: '',
        },
        'demos/demo1/demo1.js': {
          title: 'demo1 测试页',
        },
      },
    },
  },
};
```
