# `markdown-it-plugin-vue-livedemo`

> 仅支持 node 环境运行

* [ ] SDK 配置参数
* [ ] 复制成功后 Toast 提示
* [ ] 打包出 browser.js: browser.ts、index.scss、lz-string、highlight.js(含css) 共同打包
* [ ] 发布时自动上传 browser.js 到开源 CDN, 便于用户直接在 HTML 中引用, 减少每次渲染出来的代码体积


## 使用方法


> Html 文件中需要添加基础依赖: vue、lz-string、highlight.js

```html
<!-- vue 2.x -->
<script src="//unpkg.com/vue@2.6.12/dist/vue.js"></script>
<!-- highlight.js -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/color-brewer.min.css" />
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js"></script>
<!-- lz-string: codesandbox -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js"></script>

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




