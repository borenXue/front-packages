import fs from 'fs'
import path from 'path'
import glob, { IOptions } from 'glob'
import { filterFilesV2OptionEntry, filterResult } from './types'


// 本地测试
// filterFilesByRegexs({
//   globPattern: '__tests__/demo-dirs/**/*.js',
//   entryRemovedPrefix: '__tests__',
//   entryPrefix: '-=-'
// }, '', undefined, undefined, 'abc')

function logger(prefix?: string | boolean, ...rest: any) {
  const prefis = typeof prefix === 'string' ?prefix : 'xtools.node'
  console.log(`[${prefix || 'xtools.node'}]: `, rest)
}

export default function filterFilesV2 (
  entries: string | filterFilesV2OptionEntry | (string | filterFilesV2OptionEntry)[],
  baseTemplate: string,
  context?: string,
  debug: string | boolean = false,
): filterResult {
  /**
   * 1、获取 glob 过滤结果: globResultList
   */  
  const globResultList: {origin: string, entryKey: string, originAbsolute: string}[] = [];
  const finalEntries = !(entries instanceof Array) ? [entries] : entries;
  const cwd = context || process.cwd();
  for (const entryItem of finalEntries) {
    if (typeof entryItem === 'string') {
      const list = glob.sync(entryItem, { cwd });
      const list2 = list.map(it => ({ origin: it, originAbsolute: path.join(cwd, it), entryKey: it }));
      globResultList.push(...list2);
    } else {
      const list = glob.sync(entryItem.globPattern, { cwd, ignore: entryItem.globIgnore || '**/*.d.ts' });
      const list2 = list.map(it => {
        const temp = removePrefix(it, entryItem.entryRemovedPrefix) ;
        const entryKey = `${entryItem.entryPrefix || ''}${temp}`;
        return { origin: it, originAbsolute: path.join(cwd, it), entryKey };
      });
      globResultList.push(...list2);
    }
  }
  debug && logger(debug, 'glob 直接过滤出的结果: ', globResultList);

  /**
   * 2、过滤 globResultList, 只保留 dir_name/index.xx 以及 dir_name/dir_name.xx
   */
  const filteredGlobResultList = globResultList.filter(item => {
    const pureFileName = path.basename(item.origin, path.extname(item.origin));
    if (pureFileName === 'index') return true;
    const dirName = path.basename(path.dirname(item.origin));
    return pureFileName === dirName;
  })
  debug && logger(debug, 'glob 过滤结果中有效的入口文件: ', filteredGlobResultList);

  /**
   * 3、生成 filterResult 结果数据: 填充 htmlFilename、htmlTemplate 字段 并转为 filterResult 格式
   */
  const files: filterResult = {};
  for (const item of filteredGlobResultList) {
    files[item.entryKey] = {
      entryKey: item.entryKey,
      originFile: item.origin,
      originFileAbsolute: item.originAbsolute,
      htmlFilename: getHtmlFilename(item.entryKey),
      htmlTemplate: getHtmlTemplate(cwd, item.origin, baseTemplate),
    };
  }

  /**
   * 4、开发环境中 添加 __multi_pages.html
   */
  debug && logger(debug, 'process.env.NODE_ENV=' + process.env.NODE_ENV);
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    files['__multi_pages'] = {
      originFile: path.resolve(__dirname, './html/index.js'),
      entryKey: '__multi_pages',
      htmlTemplate: path.resolve(__dirname, './html/index.html'),
      htmlFilename: '__multi_pages.html',
    };
  }

  return files;
}

function removePrefix(str: string, prefix?: string) {
  if (!prefix || typeof prefix !== 'string' || prefix.trim() === '') return str;

  if (str.indexOf(prefix) !== 0) return str;

  return str.substring(prefix.length)
}

function getHtmlTemplate(context: string, file: string, baseTemplate: string): string {
  const fileNoExt = file.replace(new RegExp(`${path.extname(file)}$`), '')
  // 检测同目录下的同名 html
  let html = `${fileNoExt}.html`
  if (fs.existsSync(path.resolve(context, html))) return html
  // 检测同目录下的 index.html
  // html = html.substring(0, html.lastIndexOf('/') + 1) + 'index.html'
  html = `${path.dirname(html)}/index.html`
  if (fs.existsSync(path.resolve(context, html))) return html
  // 循环检测上级目录
  // html = html.substring(0, html.lastIndexOf('/'))
  // html = html.substring(0, html.lastIndexOf('/'))
  html = path.dirname(path.dirname(html))
  while (html && html !== '.') {
    html += '/index.html'
    if (fs.existsSync(path.resolve(context, html))) return html
    // html = html.substring(0, html.lastIndexOf('/'))
    // html = html.substring(0, html.lastIndexOf('/'))
    html = path.dirname(path.dirname(html))
  }

  if (fs.existsSync(path.resolve(context, 'index.html'))) return 'index.html'

  return baseTemplate
}

/**
 * 根据 entryKey 计算出最终的打包结果文件, 规则如下:
 *
 * src/pages/abc/demo/demo.js ---> abc/demo.html
 * src/pages/abc/demo/index.js ---> abc/demo/index.html
 *
 * @param entryKey webpack 配置项 entry 的 key
 */
function getHtmlFilename(entryKey: string): string {
  const fileName = path.basename(entryKey)
  const dirName = getFileDir(entryKey)
  const allDirName = path.dirname(entryKey)

  if (allDirName === '.' && fileName === 'index') {
    return 'index.html'
  }

  if (fileName === 'index') return `${allDirName}/index.html`
  if (fileName === dirName) return `${allDirName}.html`

  // 不符合规则直接返回空字符串
  return ''
}

function getFileDir(file: string) {
  const dirName = path.dirname(file)
  if (dirName.indexOf('/') < 0) return dirName

  return dirName.substring(dirName.lastIndexOf('/') + 1)
}
