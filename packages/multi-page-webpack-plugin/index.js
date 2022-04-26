const { webpackMultiHtml , webpackMultiHtmlDefaultOptions } = require('xtools.node');

// TODO:
//    1、测试 webpack4、webpack3 的兼容性问题
//    2、context 由默认的 process.pwd() 替换为 compiler.context
//    3、其他自定义参数测试
//    4、回忆 webpackMultiHtml 与 webpackMultiHtmlV2 的实现区别, 并备注到 xtools.node 的文档中
//    5、补充 README.md
//    6、package.json: peer 依赖配置

module.exports = class MultiPageWebpackPlugin {

  key = 'MultiPageWebpackPlugin';
  config;

  constructor(cfg) {
    cfg = cfg || {};
    let htmlPluginClass = undefined;
    if (cfg.htmlPluginClass) {
      htmlPluginClass = cfg.htmlPluginClass;
    } else {
      htmlPluginClass = require('html-webpack-plugin');
    }
    if (cfg) { delete cfg.htmlPluginClass };

    this.config = {
      ...webpackMultiHtmlDefaultOptions,
      ...(cfg || {}),
      htmlPluginClass,
    };

    // console.log('this.config: ', this.config)
  }

  getEntriesAndHtmlPlugins() {
    const [entries, options] = webpackMultiHtml(this.config);
    
    const newEntry = {};
    for (let _key in entries) {
      const val = entries[_key];
      const valList = val instanceof Array ? val : [val];
      newEntry[_key] = { import: valList };
    }

    const plugins = options.map(it => new this.config.htmlPluginClass(it));

    return [newEntry, plugins]
  }

  apply(compiler) {

    const [newEntry, plugins] = this.getEntriesAndHtmlPlugins();

    // 重置 entry
    compiler.options.entry = newEntry;
    // compiler.hooks.entryOption.tap(this.key, (context, entry) => {
    //   for (let key in entry) { delete entry[key] };
    //   for (let _key in newEntry) {
    //     entry[_key] = newEntry[key];
    //   }
    // });

    // 植入 html 插件

    compiler.options.plugins = compiler.options.plugins || [];
    plugins.forEach(it => {
      compiler.options.plugins.push(it);
      // it.apply(compiler);
    });
  }
};
