import { getEntries, getPlugins, getPluginsOptions } from './get-entries'
import getVueCliPages from './get-vue-cli-pages';
import filterFiles from './filter-files';
import filterFilesV2 from './filter-files-v2';
import { defaultOptions, defaultOptionsV2, mergeOptions } from './helper'
import { MultiHtmlOptions, MultiHtmlOptionsV2 } from './types'
import process from 'process'

export function webpackMultiHtml(cfg: Partial<MultiHtmlOptions>) {
  const context = process.cwd()
  const config = mergeOptions(defaultOptions, cfg)
  const pagesDir = typeof config.pagesDir === 'string' ? [config.pagesDir] : config.pagesDir

  const files = filterFiles(context, pagesDir, config.suffix, config.baseTemplate, config.additionalEntries)

  const entries = getEntries(files, context)
  const options = getPluginsOptions(files, config.htmlExtra)

  return [entries, options]
}

export {
  getEntries,
  getPlugins,
  getPluginsOptions,
  getVueCliPages,
  filterFiles,

  filterFilesV2,
  webpackMultiHtmlV2,
};


function webpackMultiHtmlV2(cfg: MultiHtmlOptionsV2) {
  const context = process.cwd()
  const config = { ...defaultOptionsV2, ...cfg }

  const files = filterFilesV2(config.entries as any, config.baseTemplate as string, config.context, config.debug)

  const entries = getEntries(files, context)
  const options = getPluginsOptions(files, config.htmlExtra)

  return [entries, options]
}
