import path from 'path';
import { expect } from 'chai';
import getVueCliPages from './get-vue-cli-pages';


describe('getVueCliPages 测试用例', () => {

  it('默认 htmlExtra', () => {
    expect(getVueCliPages(
      process.cwd(),
      ['__tests__/demo-dirs'],
      ['js', 'ts'],
      'public/index.html',
      [['src/main.js', 'index.html']],
      {},
    )).to.deep.equal({
      '__multi_pages': {
        chunks: ['chunk-vendors', 'chunk-common', '__multi_pages'],
        entry: `${process.cwd()}/src/webpack/multi-html/html/index.js`,
        filename: '__multi_pages.html',
        template: `${process.cwd()}/src/webpack/multi-html/html/index.html`,
      },
      'demos': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos'],
        entry: '__tests__/demo-dirs/demos/demos.js',
        filename: 'demos.html',
        template: 'public/index.html',
      },
      'demos/demo1': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos/demo1'],
        entry: '__tests__/demo-dirs/demos/demo1/demo1.js',
        filename: 'demos/demo1.html',
        template: '__tests__/demo-dirs/demos/demo1/demo1.html',
      },
      'demos/demo2/index': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos/demo2/index'],
        entry: '__tests__/demo-dirs/demos/demo2/index.ts',
        filename: 'demos/demo2/index.html',
        template: 'public/index.html',
      },
      'demos/demo3': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos/demo3'],
        entry: '__tests__/demo-dirs/demos/demo3/demo3.js',
        filename: 'demos/demo3.html',
        template: '__tests__/demo-dirs/demos/demo3/index.html',
      },
      'demos/demo3/index': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos/demo3/index'],
        entry: '__tests__/demo-dirs/demos/demo3/index.js',
        filename: 'demos/demo3/index.html',
        template: '__tests__/demo-dirs/demos/demo3/index.html',
      },
      'demos/index': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos/index'],
        entry: '__tests__/demo-dirs/demos/index.js',
        filename: 'demos/index.html',
        template: 'public/index.html',
      },
      'index': {
        chunks: ['chunk-vendors', 'chunk-common', 'index'],
        entry: 'src/main.js',
        filename: 'index.html',
        template: 'public/index.html',
      },
    })
  })

  it('自定义 htmlExtra - 综合', () => {
    expect(getVueCliPages(
      process.cwd(),
      ['__tests__/demo-dirs'],
      ['js', 'ts'],
      'public/index.html',
      [['src/main.js', 'index.html']],
      {
        __public: { title: 'title$public', icon: 'icon$public' },
        '^__tests__/demo-dirs/demos/demo3/*': { title: 'title-demo3', icon: 'icon-demo3', x: 'demo3-x' },
        '__tests__/demo-dirs/demos/demo1': { chunks: ['common-cunks']  },
        '__tests__/demo-dirs/demos/demo2/index.ts': { chunks: ['demos/demo2/index', 'common-cunks']  },
      },
    )).to.deep.equal({
      '__multi_pages': {
        chunks: ['chunk-vendors', 'chunk-common', '__multi_pages'],
        entry: `${process.cwd()}/src/webpack/multi-html/html/index.js`,
        filename: '__multi_pages.html',
        title: 'title$public', icon: 'icon$public',
        template: `${process.cwd()}/src/webpack/multi-html/html/index.html`,
      },
      'demos': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos'],
        entry: '__tests__/demo-dirs/demos/demos.js',
        filename: 'demos.html',
        title: 'title$public', icon: 'icon$public',
        template: 'public/index.html',
      },
      'demos/demo1': {
        chunks: ['common-cunks', 'chunk-vendors', 'chunk-common', 'demos/demo1'],
        entry: '__tests__/demo-dirs/demos/demo1/demo1.js',
        filename: 'demos/demo1.html',
        title: 'title$public', icon: 'icon$public',
        template: '__tests__/demo-dirs/demos/demo1/demo1.html',
      },
      'demos/demo2/index': {
        chunks: ['demos/demo2/index', 'common-cunks', 'chunk-vendors', 'chunk-common'],
        entry: '__tests__/demo-dirs/demos/demo2/index.ts',
        filename: 'demos/demo2/index.html',
        template: 'public/index.html',
        title: 'title$public', icon: 'icon$public',
      },
      'demos/demo3': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos/demo3'],
        entry: '__tests__/demo-dirs/demos/demo3/demo3.js',
        filename: 'demos/demo3.html',
        template: '__tests__/demo-dirs/demos/demo3/index.html',
        title: 'title-demo3', icon: 'icon-demo3', x: 'demo3-x'
      },
      'demos/demo3/index': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos/demo3/index'],
        entry: '__tests__/demo-dirs/demos/demo3/index.js',
        filename: 'demos/demo3/index.html',
        template: '__tests__/demo-dirs/demos/demo3/index.html',
        title: 'title-demo3', icon: 'icon-demo3', x: 'demo3-x'
      },
      'demos/index': {
        chunks: ['chunk-vendors', 'chunk-common', 'demos/index'],
        entry: '__tests__/demo-dirs/demos/index.js',
        filename: 'demos/index.html',
        template: 'public/index.html',
        title: 'title$public', icon: 'icon$public',
      },
      'index': {
        chunks: ['chunk-vendors', 'chunk-common', 'index'],
        entry: 'src/main.js',
        filename: 'index.html',
        template: 'public/index.html',
        title: 'title$public', icon: 'icon$public',
      },
    })
  })

})
