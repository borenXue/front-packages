import { getEntries, getPlugins, getPluginsOptions } from './get-entries'
import getVueCliPages from './get-vue-cli-pages';
import filterFiles from './filter-files';
import filterFilesV2 from './filter-files-v2';
import { defaultOptions, defaultOptionsV2, mergeOptions } from './helper'
import { MultiHtmlOptions, MultiHtmlOptionsV2 } from './types'
import process from 'process'
import type { Entry } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export function webpackMultiHtml(cfg: Partial<MultiHtmlOptions>): [Entry, HtmlWebpackPlugin.Options[]] {
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
  defaultOptions as webpackMultiHtmlDefaultOptions,

  filterFilesV2,
  webpackMultiHtmlV2,
  defaultOptionsV2,
};


function webpackMultiHtmlV2(cfg: MultiHtmlOptionsV2): [Entry, HtmlWebpackPlugin.Options[]] {
  const context = process.cwd()
  const config = { ...defaultOptionsV2, ...cfg }

  const files = filterFilesV2(config.entries as any, config.baseTemplate as string, config.context, config.debug)

  const entries = getEntries(files, context)
  const options = getPluginsOptions(files, config.htmlExtra)

  return [entries, options]
}






// ts-node src/webpack/multi-html/index.ts

// const [entries, options] = webpackMultiHtml({
//   pagesDir: '__tests__/demo-dirs',
//   suffix: ['js', 'ts'],
//   additionalEntries: [],
//   baseTemplate: 'public/index.html',
//   htmlExtra: {}
// });
// console.log('options: ', options)



// const [entriesV2, optionsV2] = webpackMultiHtmlV2({
//   context: process.cwd(),
//   entries: [
//     { globPattern: '__tests__/demo-dirs/**/*.js', entryRemovedPrefix: '__tests__/demo-dirs/' },
//     { globPattern: '__tests__/demo-dirs/**/*.ts', entryRemovedPrefix: '__tests__/demo-dirs/', globIgnore: '**/*.d.ts' },
//   ],
//   baseTemplate: 'public/index.html',
//   debug: false,
//   htmlExtra: {}
// });
// console.log('optionsV2: ', optionsV2)
