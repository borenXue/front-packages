export interface MultiHtmlOptions {
  /**
   * 页面查找目录, 支持字符串和字符串数组
   *
   * eg: 'src/pages' 或 ['src/pages', 'src/new-pages']
   *
   * default: 'src/pages'
   */
  pagesDir: string | string[]

  /**
   * 入口文件后缀, 数组格式
   *
   * default: ['js', 'ts']
   */
  suffix: string[]

  /**
   * 额外的入口文件数组 (除 pagesDir 目录外的其他入口文件)
   *
   * eg:
   *  [
   *    ['src/abc/main.js', 'abc/index.html']  代表: src/abc/main.js 打包为 'abc/index.html'
   *  ]
   *
   * default: ['src/main.js', 'index.html']
   */
  additionalEntries: [string, string][]

  /**
   * 默认的 html 模板文件路径, 字符串格式
   *
   * default: 'public/index.html'
   */
  baseTemplate: string

  /**
   * 额外的 html 配置项, 用于设置 TODO:
   */
  htmlExtra: {
    __public?: object
    [key: string]: object | undefined
  }
}

export interface filterResult {
  [originFile: string]: filterResultItemValue
}

export interface filterResultItemValue {
  /**
   * 源文件的相对路径 (相对于 context 目录)
   *
   * eg: src/pages/strategy-category/index.js
   */
  originFile: string,
  originFileAbsolute?: string,
  /**
   * 最终配置到 webpack 中的入口文件 entry key
   * 
   * eg: 源文件 src/pages/strategy-category/index.js 的 entryKey 为 strategy-category/index
   */
  entryKey: string,
  /**
   * 要使用的 html 模板的相对路径 (相对于 context 目录)
   * 
   * 对应 html-webpack-plugin 插件的 template 参数
   */
  htmlTemplate: string,
  /**
   * 对应 html-webpack-plugin 插件的 filename 参数
   */
  htmlFilename: string,
}










export interface filterFilesV2OptionEntry {
  /**
   * 用来匹配的 glob pattern 字符串
   */
  globPattern: string;
  globIgnore?: string;
  /**
   * 文件相对路径作为 entry key 时, 需要删除掉的 globPattern 中的前缀部分
   */
  entryRemovedPrefix?: string;
  /**
   * 文件相对路径作为 entry key 时, 需要添加的额外前缀
   */
  entryPrefix?: string;
}

export interface MultiHtmlOptionsV2 {
  // 默认值: [
  //    { globPattern: 'src/pages/**/*.js', entryRemovedPrefix: 'src/pages/' },
  //    { globPattern: 'src/pages/**/*.ts', entryRemovedPrefix: 'src/pages/' }
  // ]
  entries?: string | filterFilesV2OptionEntry | (string | filterFilesV2OptionEntry)[],

  /**
   * 默认的 html 模板文件路径, 字符串格式
   *
   * default: 'public/index.html'
   */
  baseTemplate?: string

  context?: string

  debug?: string | boolean;

  /**
   * 额外的 html 配置项
   */
  htmlExtra: {
    __public?: object
    [key: string]: object | undefined
  }
}
