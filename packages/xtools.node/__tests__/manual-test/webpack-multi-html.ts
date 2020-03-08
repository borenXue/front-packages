import fs from 'fs'
import path from 'path'

//------------ 直接引用 ts 源文件
import {
  webpackFilterFiles as filterFiles,
  webpackGetEntries as getEntries,
  webpackGetPluginsOptions as getPluginsOptions,
  webpackGetVueCliPages,
} from '../../src/index'

//------------ 引用 js 结果文件
// import {
//   webpackFilterFiles as filterFiles,
//   webpackGetEntries as getEntries,
//   webpackGetPluginsOptions as getPluginsOptions,
// } from '../../lib/index'


const context  ='/Users/xueboren/Weiyi/wyfront-pay'
const pagesDirList = ['src/pages']
const suffix = ['js', 'ts']
const baseTemplate = 'public/index.html'
const additionalEntries: [string, string][] = [
  ['src/public/http.js', 'abc/http.html'],
];
const htmlExtra = {
  __public: {
    title: 'none title',
  },
  'src/pages/pay-quickmoney/pay-quickmoney.js': {
    title: '快钱标题哦',
    chunks: [],
  },
  'src/pages/*': {
    title: 'sr 目录的默认标题',
    chunks: ['a'],
  },
}


// 过滤出文件列表
const files = filterFiles(context, pagesDirList, suffix, baseTemplate, additionalEntries)
writeJsonToFile(files, './localdata-files.json')

const entries = getEntries(files, context)
writeJsonToFile(entries, './localdata-entries.json')

const pluginsOptions = getPluginsOptions(files, htmlExtra)
writeJsonToFile(pluginsOptions, './localdata-plugins-options.json')



const vueCliPages = webpackGetVueCliPages(context, pagesDirList, suffix, baseTemplate, additionalEntries, htmlExtra)
writeJsonToFile(vueCliPages, './localdata-vuecli-pages.json')



function writeJsonToFile(json: object, fileName: string) {
  fs.writeFileSync(
    path.resolve(__dirname, fileName),
    JSON.stringify(json, null, 2),
  )
}
