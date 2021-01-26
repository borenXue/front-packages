import path from 'path'
import { Options } from 'html-webpack-plugin'
import { defaultOptions, execHtmlPluginParams } from './helper'
import { Entry } from "webpack"
import { filterResult, filterResultItemValue } from './types'

type entriesType = {
  [key: string]: string
}

type getEntriesResult = [
  entriesType,
  any,
]

/**
 * 根据过滤后的入口文件结果 生成 对应的 webpack entry 配置
 */
export function getEntries(files: filterResult, context: string) {
  const result: Entry = {}
  for (const originFileKey in files) {
    const item = files[originFileKey]

    result[item.entryKey] = path.resolve(context, item.originFile)
  }
  return result
}

/**
 * 根据过滤后的入口文件结果 与 htmlExtra 配置, 生成对应的 HtmlWebpackPlugin 插件实例数组
 */
export function getPlugins(files: filterResult, htmlExtra: typeof defaultOptions.htmlExtra) {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  return getPluginsOptions(files, htmlExtra).map(item => new HtmlWebpackPlugin(item))
}

export function getPluginsOptions(files: filterResult, htmlExtra?: typeof defaultOptions.htmlExtra): Options[] {
  const entries: entriesType = {}
  const options: Options[] = []

  for (const originFileKey in files) {
    const item = files[originFileKey]

    entries[item.entryKey] = item.originFile

    const params = execHtmlPluginParams(item, htmlExtra)
    let chunks = [item.entryKey]
    // 用户配置的 chunks 为非空数组时, 使用用户的配置, 并自动补全: entryKey
    if ((params as any).chunks && (params as any).chunks instanceof Array && (params as any).chunks.length > 0) {
      chunks = (params as any).chunks
      if (chunks.indexOf(item.entryKey) < 0) {
        chunks.push(item.entryKey)
      }
    }
    delete (params as any).chunks
    options.push({
      ...params,
      filename: item.htmlFilename,
      template: item.htmlTemplate,
      chunks,
    })
  }

  return options
}
