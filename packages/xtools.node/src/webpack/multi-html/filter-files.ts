import fs from 'fs'
import path from 'path'
import glob, { IOptions } from 'glob'
import { filterResult } from './types'

export default function (
  context: string,
  pagesDirList: string[],
  suffix: string[],
  baseTemplate: string,
  additionalEntries: [string, string][],
): filterResult {
  const files: filterResult = {}
  const globOptions: IOptions = {
    cwd: context,
    ignore: '**/*.d.ts',
  }

  for (const pagesDir of pagesDirList) {
    const str = `${pagesDir}/**/*.@(${suffix.join('|')})`
    for (const item of glob.sync(str, globOptions)) {
      // 过滤非 index.xx 与 abc/abc.xx 的文件
      if (!isValidEntry(item, suffix)) continue

      const entryKeyJS = item.replace(new RegExp(`${pagesDir}`), '')
        .replace(/^\//, '')
        .replace(new RegExp(`\.(${suffix.join('|')})`), '')
      const htmlFilename = getHtmlFilename(entryKeyJS)
      const entryKey = htmlFilename.substring(0, htmlFilename.lastIndexOf('.'))
      files[item] = {
        originFile: item,
        entryKey,
        htmlTemplate: getHtmlTemplate(context, item, baseTemplate),
        htmlFilename,
      }
    }
  }

  for (const arr of additionalEntries) {
    files[arr[0]] = {
      originFile: arr[0],
      entryKey: arr[1].replace(/\.html$/, ''),
      htmlTemplate: getHtmlTemplate(context, arr[0], baseTemplate),
      htmlFilename: arr[1],
    }
  }

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    files['__multi_pages'] = {
      originFile: path.resolve(__dirname, './html/index.js'),
      entryKey: '__multi_pages',
      htmlTemplate: path.resolve(__dirname, './html/index.html'),
      htmlFilename: '__multi_pages.html',
    }
  }

  return files
}

function isValidEntry(file: string, suffix: string[]) {
  const fileName = path.basename(file).replace(new RegExp(`${path.extname(file)}$`), '')
  const dirName = getFileDir(file)
  if (fileName === 'index' || fileName === dirName) return true
  return false
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

  if (fileName === 'index') return `${dirName}/index.html`
  if (fileName === dirName) return `${fileName}.html`

  // 不符合规则直接返回空字符串
  return ''
}

function getFileDir(file: string) {
  const dirName = path.dirname(file)
  if (dirName.indexOf('/') < 0) return dirName

  return dirName.substring(dirName.lastIndexOf('/') + 1)
}
