import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
// @ts-ignore
import MarkdownItPluginVueLiveDemo, { createVuelivedemoPlugin } from '../lib/index.js';
// @ts-ignore
import pkg from '../package.json';

const md = MarkdownIt();
// md.use(MarkdownItPluginVueLiveDemo);
md.use(createVuelivedemoPlugin({
  codeSandBoxDataFn: 'codeSandBoxDataFn',
  codepenDataFn: 'codepenDataFn'
}));

const content = fs.readFileSync(path.resolve(__dirname, 'demo.md'))
// const content = fs.readFileSync(path.resolve(__dirname, 'filter.md'))

const result = md.render(content.toString());

// <script src="../lib/browser-sdk.js"></script>
// <script src="https://unpkg.com/markdown-it-plugin-vue-livedemo@${pkg.version}/lib/browser-sdk.js"></script>
fs.writeFileSync(path.resolve(__dirname, 'demo-full.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue@2.6.12/dist/vue.js"></script>
 
  <script src="https://unpkg.com/element-ui"></script>
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"></link>
 
  <script src="local.js"></script>
  <script src="../lib/browser-sdk.js"></script>
</head>
<body style="padding: 50px;">
  ${result}
</body>
</html>
`)
