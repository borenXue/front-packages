import { MultiHtmlOptions, filterResultItemValue, MultiHtmlOptionsV2 } from "./types"

export function throwError(info: string) {
  throw new Error(`[WebpackPluginMultiHtml]\t${info}`)
}

export function execHtmlPluginParams(fileItem: filterResultItemValue, htmlExtra: typeof defaultOptions.htmlExtra): object {
  const result = JSON.parse(JSON.stringify(htmlExtra.__public || {}))
  for (const key in htmlExtra) {
    if (key === fileItem.originFile || new RegExp(key).test(fileItem.originFile)) {
      return Object.assign({}, result, JSON.parse(JSON.stringify(htmlExtra[key])))
    }
  }
  return result
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










export const defaultOptionsV2: MultiHtmlOptionsV2 = {
  entries: [
    { globPattern: 'src/pages/**/*.js', entryRemovedPrefix: 'src/pages/' },
    { globPattern: 'src/pages/**/*.ts', entryRemovedPrefix: 'src/pages/', globIgnore: '**/*.d.ts' },
  ],
  context: process.cwd(),
  debug: false,
  baseTemplate: 'public/index.html',
  htmlExtra: {},
}
