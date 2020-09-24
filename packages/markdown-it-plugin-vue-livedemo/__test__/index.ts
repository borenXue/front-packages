import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
// @ts-ignore
import MarkdownItPluginVueLiveDemo from '../lib/index.js';

const md = MarkdownIt();
md.use(MarkdownItPluginVueLiveDemo);

const content = fs.readFileSync(path.resolve(__dirname, 'demo.md'))

const result = md.render(content.toString());

fs.writeFileSync(path.resolve(__dirname, 'demo.html'), result);

fs.writeFileSync(path.resolve(__dirname, 'demo-full.html'), `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue@2.6.12/dist/vue.js"></script>
  <script src="//unpkg.com/markdown-it-plugin-vue-livedemo/lib/browser-sdk.js"></script>
</head>
<body style="padding: 50px;">
  ${result}
</body>
</html>
`)
