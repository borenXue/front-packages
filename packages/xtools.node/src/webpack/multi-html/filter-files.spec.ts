import { expect } from 'chai';
import filterFiles from './filter-files';

describe('filterFiles 测试用例', () => {

  it('模拟默认配置: pagesDir 为 __tests__/demo-dirs', () => {
    expect(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs'],
      ['js', 'ts'],
      'public/index.html',
      [
        ['src/main.js', 'index.html']
      ],
    )).to.deep.equal({
      "__tests__/demo-dirs/demos/demo1/demo1.js": {
        "originFile": "__tests__/demo-dirs/demos/demo1/demo1.js",
        "entryKey": "demos/demo1",
        "htmlTemplate": "__tests__/demo-dirs/demos/demo1/demo1.html",
        "htmlFilename": "demos/demo1.html"
      },
      "__tests__/demo-dirs/demos/demo2/index.ts": {
        "originFile": "__tests__/demo-dirs/demos/demo2/index.ts",
        "entryKey": "demos/demo2/index",
        "htmlTemplate": "public/index.html",
        "htmlFilename": "demos/demo2/index.html"
      },
      "__tests__/demo-dirs/demos/demo3/demo3.js": {
        "originFile": "__tests__/demo-dirs/demos/demo3/demo3.js",
        "entryKey": "demos/demo3",
        "htmlTemplate": "__tests__/demo-dirs/demos/demo3/index.html",
        "htmlFilename": "demos/demo3.html"
      },
      "__tests__/demo-dirs/demos/demo3/index.js": {
        "originFile": "__tests__/demo-dirs/demos/demo3/index.js",
        "entryKey": "demos/demo3/index",
        "htmlTemplate": "__tests__/demo-dirs/demos/demo3/index.html",
        "htmlFilename": "demos/demo3/index.html"
      },
      "__tests__/demo-dirs/demos/index.js": {
        "originFile": "__tests__/demo-dirs/demos/index.js",
        "entryKey": "demos/index",
        "htmlTemplate": "public/index.html",
        "htmlFilename": "demos/index.html"
      },
      "__tests__/demo-dirs/demos/demos.js": {
        "originFile": "__tests__/demo-dirs/demos/demos.js",
        "entryKey": "demos",
        "htmlTemplate": "public/index.html",
        "htmlFilename": "demos.html"
      },
      "src/main.js": {
        "originFile": "src/main.js",
        "entryKey": "index",
        "htmlTemplate": "public/index.html",
        "htmlFilename": "index.html"
      },
      "__multi_pages": {
        "originFile": `${process.cwd()}/src/webpack/multi-html/html/index.js`,
        "entryKey": "__multi_pages",
        "htmlTemplate": `${process.cwd()}/src/webpack/multi-html/html/index.html`,
        "htmlFilename": "__multi_pages.html"
      }
    })
  })


  it('参数 pagesDirList(多页面目录) 测试: pagesDir 为 __tests__/demo-dirs/demos', () => {
    expect(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs/demos'],
      ['js', 'ts'],
      'public/index.html',
      [
        ['src/main.js', 'index.html']
      ],
    )).to.deep.equal({
      "__tests__/demo-dirs/demos/demo1/demo1.js": {
        "originFile": "__tests__/demo-dirs/demos/demo1/demo1.js",
        "entryKey": "demo1",
        "htmlTemplate": "__tests__/demo-dirs/demos/demo1/demo1.html",
        "htmlFilename": "demo1.html"
      },
      "__tests__/demo-dirs/demos/demo2/index.ts": {
        "originFile": "__tests__/demo-dirs/demos/demo2/index.ts",
        "entryKey": "demo2/index",
        "htmlTemplate": "public/index.html",
        "htmlFilename": "demo2/index.html"
      },
      "__tests__/demo-dirs/demos/demo3/demo3.js": {
        "originFile": "__tests__/demo-dirs/demos/demo3/demo3.js",
        "entryKey": "demo3",
        "htmlTemplate": "__tests__/demo-dirs/demos/demo3/index.html",
        "htmlFilename": "demo3.html"
      },
      "__tests__/demo-dirs/demos/demo3/index.js": {
        "originFile": "__tests__/demo-dirs/demos/demo3/index.js",
        "entryKey": "demo3/index",
        "htmlTemplate": "__tests__/demo-dirs/demos/demo3/index.html",
        "htmlFilename": "demo3/index.html"
      },
      "__tests__/demo-dirs/demos/index.js": {
        "originFile": "__tests__/demo-dirs/demos/index.js",
        "entryKey": "index",
        "htmlTemplate": "public/index.html",
        "htmlFilename": "index.html"
      },
      "src/main.js": {
        "originFile": "src/main.js",
        "entryKey": "index",
        "htmlTemplate": "public/index.html",
        "htmlFilename": "index.html"
      },
      "__multi_pages": {
        "originFile": `${process.cwd()}/src/webpack/multi-html/html/index.js`,
        "entryKey": "__multi_pages",
        "htmlTemplate": `${process.cwd()}/src/webpack/multi-html/html/index.html`,
        "htmlFilename": "__multi_pages.html"
      }
    })
  })


  it('参数 suffix(入口文件后缀) 测试: ["xjs", "zjs"]', () => {
    expect(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs-suffix'],
      ['xjs', 'zjs'],
      'public/index.html',
      [],
    )).to.deep.equal({
      "__tests__/demo-dirs-suffix/demos/demo3/index.xjs": {
        "originFile": "__tests__/demo-dirs-suffix/demos/demo3/index.xjs",
        "entryKey": "demos/demo3/index",
        "htmlTemplate": "public/index.html",
        "htmlFilename": "demos/demo3/index.html"
      },
      "__tests__/demo-dirs-suffix/demos/index.xjs": {
        "originFile": "__tests__/demo-dirs-suffix/demos/index.xjs",
        "entryKey": "demos/index",
        "htmlTemplate": "public/index.html",
        "htmlFilename": "demos/index.html"
      },
      "__tests__/demo-dirs-suffix/demos/demo2/index.zjs": {
        "entryKey": "demos/demo2/index",
        "htmlFilename": "demos/demo2/index.html",
        "htmlTemplate": "public/index.html",
        "originFile": "__tests__/demo-dirs-suffix/demos/demo2/index.zjs"
      },
      "__multi_pages": {
        "originFile": `${process.cwd()}/src/webpack/multi-html/html/index.js`,
        "entryKey": "__multi_pages",
        "htmlTemplate": `${process.cwd()}/src/webpack/multi-html/html/index.html`,
        "htmlFilename": "__multi_pages.html"
      },
    })
  })


  it('参数 additionalEntries(额外入口文件) 测试: ["xjs", "zjs"]', () => {
    expect(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs-suffix'],
      ['zjs'],
      'public/index.html',
      [
        ['src/abc.js', 'my/abc.html'],
        ['src/def/xbr.ts', 'my/def/xbr.html'],
      ],
    )).to.deep.equal({
      "__tests__/demo-dirs-suffix/demos/demo2/index.zjs": {
        "entryKey": "demos/demo2/index",
        "htmlFilename": "demos/demo2/index.html",
        "htmlTemplate": "public/index.html",
        "originFile": "__tests__/demo-dirs-suffix/demos/demo2/index.zjs"
      },
      "src/abc.js": {
        "entryKey": "my/abc",
        "htmlFilename": "my/abc.html",
        "htmlTemplate": "public/index.html",
        "originFile": "src/abc.js"
      },
      "src/def/xbr.ts": {
        "entryKey": "my/def/xbr",
        "htmlFilename": "my/def/xbr.html",
        "htmlTemplate": "public/index.html",
        "originFile": "src/def/xbr.ts"
      },
      "__multi_pages": {
        "originFile": `${process.cwd()}/src/webpack/multi-html/html/index.js`,
        "entryKey": "__multi_pages",
        "htmlTemplate": `${process.cwd()}/src/webpack/multi-html/html/index.html`,
        "htmlFilename": "__multi_pages.html"
      },
    })
  })


  it('__multi_pages 测试: NODE_ENV 为 production 时不生成', () => {
    const originNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    expect(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs-suffix'],
      ['zjs'],
      'public/index.html',
      [],
    )).to.deep.equal({
      "__tests__/demo-dirs-suffix/demos/demo2/index.zjs": {
        "entryKey": "demos/demo2/index",
        "htmlFilename": "demos/demo2/index.html",
        "htmlTemplate": "public/index.html",
        "originFile": "__tests__/demo-dirs-suffix/demos/demo2/index.zjs"
      },
    })
    process.env.NODE_ENV = originNodeEnv;
  })

})
