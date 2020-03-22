import path from 'path';
import { expect } from 'chai';
import { getEntries, getPluginsOptions } from './get-entries';
import filterFiles from './filter-files';

process.env.NODE_ENV = 'development'

describe('getEntries 测试用例', () => {

  it('模拟默认配置: pagesDir 为 __tests__/demo-dirs', () => {
    expect(getEntries(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs'],
      ['js', 'ts'],
      'public/index.html',
      [
        ['src/main.js', 'index.html']
      ],
    ), process.cwd())).to.deep.equal({
      'demos/demo1': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/demo1/demo1.js'),
      'demos/demo2/index': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/demo2/index.ts'),
      'demos/demo3': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/demo3/demo3.js'),
      'demos/demo3/index': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/demo3/index.js'),
      'demos/index': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/index.js'),
      'demos': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/demos.js'),
      'index': path.resolve(process.cwd(), 'src/main.js'),
      '__multi_pages': `${process.cwd()}/src/webpack/multi-html/html/index.js`,
    })
  })

  it('参数 pagesDirList(多页面目录) 测试: pagesDir 为 __tests__/demo-dirs/demos', () => {
    expect(getEntries(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs/demos'],
      ['js', 'ts'],
      'public/index.html',
      [
        ['src/main.js', 'index.html']
      ],
    ), process.cwd())).to.deep.equal({
      'demo1': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/demo1/demo1.js'),
      'demo2/index': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/demo2/index.ts'),
      'demo3': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/demo3/demo3.js'),
      'demo3/index': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/demo3/index.js'),
      // 'index': path.resolve(process.cwd(), '__tests__/demo-dirs/demos/index.js'),
      'index': path.resolve(process.cwd(), 'src/main.js'),
      '__multi_pages': `${process.cwd()}/src/webpack/multi-html/html/index.js`,
    })
  })

  it('参数 suffix(入口文件后缀) 测试: ["xjs", "zjs"]', () => {
    expect(getEntries(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs-suffix'],
      ['xjs', 'zjs'],
      'public/index.html',
      [],
    ), process.cwd())).to.deep.equal({
      'demos/demo3/index': path.resolve(process.cwd(), '__tests__/demo-dirs-suffix/demos/demo3/index.xjs'),
      'demos/index': path.resolve(process.cwd(), '__tests__/demo-dirs-suffix/demos/index.xjs'),
      'demos/demo2/index': path.resolve(process.cwd(), '__tests__/demo-dirs-suffix/demos/demo2/index.zjs'),
      '__multi_pages': `${process.cwd()}/src/webpack/multi-html/html/index.js`,
    })
  })

  it('参数 additionalEntries(额外入口文件) 测试: ["xjs", "zjs"]', () => {
    expect(getEntries(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs-suffix'],
      ['zjs'],
      'public/index.html',
      [
        ['src/abc.js', 'my/abc.html'],
        ['src/def/xbr.ts', 'my/def/xbr.html'],
      ],
    ), process.cwd())).to.deep.equal({
      'demos/demo2/index': path.resolve(process.cwd(), '__tests__/demo-dirs-suffix/demos/demo2/index.zjs'),
      'my/abc': path.resolve(process.cwd(), 'src/abc.js'),
      'my/def/xbr': path.resolve(process.cwd(), 'src/def/xbr.ts'),
      '__multi_pages': `${process.cwd()}/src/webpack/multi-html/html/index.js`,
    })
  })

  it('__multi_pages 测试: NODE_ENV 为 production 时不生成', () => {
    const originNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    expect(getEntries(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs-suffix'],
      ['zjs'],
      'public/index.html',
      [],
    ), process.cwd())).to.deep.equal({
      'demos/demo2/index': path.resolve(process.cwd(), '__tests__/demo-dirs-suffix/demos/demo2/index.zjs'),
    })
    process.env.NODE_ENV = originNodeEnv;
  })

})





describe('getPluginsOptions 测试用例', () => {

  it('htmlExtra 默认配置: pagesDir=__tests__/demo-dirs', () => {
    process.env.NODE_ENV = 'development'
    expect(getPluginsOptions(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs'],
      ['js', 'ts'],
      'public/index.html',
      [
        ['src/main.js', 'index.html']
      ],
    ), {})).to.deep.equal([
      {
        filename: 'demos/demo1.html',
        template: '__tests__/demo-dirs/demos/demo1/demo1.html',
        chunks: ['demos/demo1'],
      },
      {
        filename: 'demos/demo2/index.html',
        template: 'public/index.html',
        chunks: ['demos/demo2/index'],
      },
      {
        filename: 'demos/demo3.html',
        template: '__tests__/demo-dirs/demos/demo3/index.html',
        chunks: ['demos/demo3'],
      },
      {
        filename: 'demos/demo3/index.html',
        template: '__tests__/demo-dirs/demos/demo3/index.html',
        chunks: ['demos/demo3/index'],
      },
      {
        filename: 'demos.html',
        template: 'public/index.html',
        chunks: ['demos'],
      },
      {
        filename: 'demos/index.html',
        template: 'public/index.html',
        chunks: ['demos/index'],
      },
      {
        filename: 'index.html',
        template: 'public/index.html',
        chunks: ['index'],
      },
      {
        filename: '__multi_pages.html',
        template: `${process.cwd()}/src/webpack/multi-html/html/index.html`,
        chunks: ['__multi_pages'],
      },
    ])
  })

  it('htmlExtra 自定义配置: 综合测试', () => {
    process.env.NODE_ENV = 'development'
    expect(getPluginsOptions(filterFiles(
      process.cwd(),
      ['__tests__/demo-dirs'],
      ['js', 'ts'],
      'public/index.html',
      [
        ['src/main.js', 'index.html']
      ],
    ), {
      __public: { title: 'title$public', icon: 'icon$public' },
      '^__tests__/demo-dirs/demos/demo3/*': { title: 'title-demo3', icon: 'icon-demo3', x: 'demo3-x' },
      '__tests__/demo-dirs/demos/demo1': { chunks: ['common-cunks']  },
      '__tests__/demo-dirs/demos/demo2/index.ts': { chunks: ['demos/demo2/index', 'common-cunks']  },
    })).to.deep.equal([
      {
        filename: 'demos/demo1.html',
        template: '__tests__/demo-dirs/demos/demo1/demo1.html',
        chunks: ['common-cunks', 'demos/demo1'],
        title: 'title$public', icon: 'icon$public',
      },
      {
        filename: 'demos/demo2/index.html',
        template: 'public/index.html',
        chunks: ['demos/demo2/index', 'common-cunks'],
        title: 'title$public', icon: 'icon$public',
      },
      {
        filename: 'demos/demo3.html',
        template: '__tests__/demo-dirs/demos/demo3/index.html',
        chunks: ['demos/demo3'],
        title: 'title-demo3', icon: 'icon-demo3', x: 'demo3-x',
      },
      {
        filename: 'demos/demo3/index.html',
        template: '__tests__/demo-dirs/demos/demo3/index.html',
        chunks: ['demos/demo3/index'],
        title: 'title-demo3', icon: 'icon-demo3', x: 'demo3-x',
      },
      {
        filename: 'demos.html',
        template: 'public/index.html',
        chunks: ['demos'],
        title: 'title$public', icon: 'icon$public',
      },
      {
        filename: 'demos/index.html',
        template: 'public/index.html',
        chunks: ['demos/index'],
        title: 'title$public', icon: 'icon$public',
      },
      {
        filename: 'index.html',
        template: 'public/index.html',
        chunks: ['index'],
        title: 'title$public', icon: 'icon$public',
      },
      {
        filename: '__multi_pages.html',
        template: `${process.cwd()}/src/webpack/multi-html/html/index.html`,
        chunks: ['__multi_pages'],
        title: 'title$public', icon: 'icon$public',
      },
    ])
  })

})
