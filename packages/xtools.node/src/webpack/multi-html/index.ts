import { getEntries, getPlugins, getPluginsOptions } from './get-entries'
import getVueCliPages from './get-vue-cli-pages';
import filterFiles from './filter-files';
import { defaultOptions, mergeOptions } from './helper'
import { MultiHtmlOptions } from './types'
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
};
