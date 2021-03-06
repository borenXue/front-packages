
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

export const defaultOptions: MultiHtmlOptions = {
  pagesDir: 'src/pages',
  suffix: ['js', 'ts'],
  baseTemplate: 'public/index.html',
  additionalEntries: [
    ['src/main.js', 'index.html'],
  ],
  htmlExtra: {},
}

export function mergeOptions(defaults: MultiHtmlOptions, options: undefined | Partial<MultiHtmlOptions>): MultiHtmlOptions {
  if (!options) return defaults

  // 参数校验通过, 开始合并参数
  const final: MultiHtmlOptions = JSON.parse(JSON.stringify(defaults))

  if (options.baseTemplate !== undefined) {
    if (typeof options.baseTemplate !== 'string') throwError('参数错误: baseTemplate 必须为字符串类型或 undefined')
    final.baseTemplate = options.baseTemplate
  }

  if (options.suffix !== undefined) {
    if (isStringArray(options.suffix, false)) {
      final.suffix = options.suffix  
    } else {
      throwError('参数错误: suffix 必须为非空字符串数组或 undefined')
    }
  }

  if (options.htmlExtra !== undefined) {
    if (typeof options.htmlExtra !== 'object')
      throwError('参数错误: htmlExtra 必须为对象或 undefined')
    final.htmlExtra = options.htmlExtra
  }

  if (options.pagesDir !== undefined) {
    if (typeof options.pagesDir !== 'string' && !isStringArray(options.pagesDir, true))
      throwError('参数错误: pagesDir 必须为 字符串 或 字符串数组 或 undefined')
    final.pagesDir = options.pagesDir
  }

  if (options.additionalEntries !== undefined) {
    if (typeof options.additionalEntries !== 'string' && isValidAdditionalEntries(options.additionalEntries))
      throwError('参数错误: additionalEntries 必须为 undefined 或 [[string, string, string]] 格式')
    final.additionalEntries = options.additionalEntries
  }

  return final
}

function isStringArray(arr: any, allowEmpty: boolean) {
  if (arr instanceof Array) {
    if (!allowEmpty) {
      if (arr.length === 0) return false
    }

    if (arr.filter(item => typeof item !== 'string').length > 0) return false

    return true
  }
  return false
}

function isValidAdditionalEntries(arr: any) {
  if (arr instanceof Array) {

    if (arr.filter(item => !isStringArray(item, false) || item.length !== 2)) {
      return false
    }

    return true

  }
  return false
}

function throwError(msg: string) {
  throw new Error(msg)
}
