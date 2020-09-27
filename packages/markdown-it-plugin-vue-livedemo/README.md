# `markdown-it-plugin-vue-livedemo`

> 仅支持 node 环境运行

* [X] SDK 配置参数
* [ ] 复制成功后 Toast 提示
* [X] 打包出 browser.js: browser.ts、index.scss、lz-string、highlight.js(含css) 共同打包
* [X] 发布时自动上传 browser.js 到开源 CDN, 便于用户直接在 HTML 中引用, 减少每次渲染出来的代码体积


## 使用方法


> Html 文件中需要添加基础依赖: vue、browser-sdk

```html
<!-- vue 2.x -->
<script src="//unpkg.com/vue@2.6.12/dist/vue.js"></script>
<!-- markdown-it-plugin-vue-livedemo browser sdk -->
<script src="//unpkg.com/markdown-it-plugin-vue-livedemo/lib/browser-sdk.js"></script>
```

> 编译 Markdown 文件

```javascript
import MarkdownIt from 'markdown-it';
import MarkdownItPluginVueLiveDemo from 'markdown-it-plugin-vue-livedemo';

const md = MarkdownIt();
md.use(MarkdownItPluginVueLiveDemo);

const result = md.render(`

## Vue LiveDemo 示例

\`\`\`vue
<!-- livedemo:
  {
    "title": "a"
  }
-->

<template>
  <div class="demo-001">
    <div>currentTag: {{ currentTag }}</div>
    <div class="green">tagList: {{ newTag }}</div>
  </div>
</template>

<style>
  .demo-001 {
    color: red;
  }
  .green {
    color: green;
  }
</style>

<script>
  export default {
    data() {
      return {
        currentTag: 'it',
        newTag: 'abc',

        tagList: [
          { id: 'it', name: '科技' },
          { id: 'tec', name: '教育' },
          { id: 'war', name: '战争' },
        ],
      };
    },
  };
</script>

\`\`\`

`);
```




