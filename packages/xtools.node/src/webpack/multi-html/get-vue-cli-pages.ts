import fs from 'fs'
import path from 'path'
import { filterResult } from './types'
import { defaultOptions, execHtmlPluginParams } from './helper';
import filterFiles from './filter-files';


interface VueCliPages {
  [key: string]: {
    /**
     * page 的入口
     * 
     * eg: 'src/index/main.js'
     */
    entry: string,
    /**
     * 模板来源
     * 
     * 'public/index.html'
     */
    template: string,
    /**
     * 输出到 dist 目录的文件名
     * 
     * eg: index.html 或 demo/index.html
     */
    filename: string,
    /**
     * 页面标题
     *
     * template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
     */
    title?: string,
    /**
     * 在这个页面中包含的块，默认情况下会包含
     * 提取出来的通用 chunk 和 vendor chunk
     * 
     * eg: ['chunk-vendors', 'chunk-common', 'index']
     */
    chunks: string | string[],
    [key: string]: any,
  }
}

export default function(
  context: string,
  pagesDirList: string[],
  suffix: string[],
  baseTemplate: string,
  additionalEntries: [string, string][],
  htmlExtra: typeof defaultOptions.htmlExtra
): VueCliPages {
  const files = filterFiles(context, pagesDirList, suffix, baseTemplate, additionalEntries)

  return generagePages(files, htmlExtra)
}

function generagePages(files: filterResult, htmlExtra: typeof defaultOptions.htmlExtra): VueCliPages {
  const result: VueCliPages = {}

  for (const originFileKey in files) {
    const item = files[originFileKey]
    const params = execHtmlPluginParams(item, htmlExtra)
    let chunks = ['chunk-vendors', 'chunk-common', item.entryKey]
    // 用户配置的 chunks 为非空数组时, 使用用户的配置, 并自动补全: entryKey、chunk-vendors、chunk-common
    if ((params as any).chunks && (params as any).chunks instanceof Array && (params as any).chunks.length > 0) {
      chunks = (params as any).chunks
      if (chunks.indexOf('chunk-vendors') < 0) {
        chunks.push('chunk-vendors')
      }
      if (chunks.indexOf('chunk-common') < 0) {
        chunks.push('chunk-common')
      }
      if (chunks.indexOf(item.entryKey) < 0) {
        chunks.push(item.entryKey)
      }
    }
    delete (params as any).chunks
    result[item.entryKey] = {
      ...params,
      entry: item.originFile,
      template: item.htmlTemplate,
      filename: item.htmlFilename,
      chunks,
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, './html/data-files.json'),
    JSON.stringify(result, null, 2),
  )

  return result
}
