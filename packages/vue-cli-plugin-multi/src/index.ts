import { webpackGetVueCliPages } from 'xtools.node'
import { mergeOptions, defaultOptions } from "./helper"



module.exports =  function(api: any, projectOptions: any) {

  // 如果 pages 已配置, 则不作任何处理
  if (api.service.projectOptions.pages) {
    console.warn('检测到 pages 已配置, vue-cli-plugin-multi 插件被忽略执行')
    return
  }

  // 参数校验与初始化
  let multiOptions = undefined;
  if (api.service.projectOptions && api.service.projectOptions.pluginOptions && api.service.projectOptions.pluginOptions.multi) {
      multiOptions = api.service.projectOptions.pluginOptions.multi
  }
  if (multiOptions !== undefined && multiOptions !== null && typeof multiOptions !== 'object') {
    throw new Error('options 参数必须为对象或 undefined 或 null')
  }
  const config = mergeOptions(defaultOptions, multiOptions)

  const pagesDirList = typeof config.pagesDir === 'string' ? [config.pagesDir] : config.pagesDir
  const pages = webpackGetVueCliPages(
    api.getCwd(),
    pagesDirList,
    config.suffix,
    config.baseTemplate,
    config.additionalEntries,
    config.htmlExtra,
  )

  api.service.projectOptions.pages = pages
}




