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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/color-brewer.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js"></script>
</head>
<body style="padding: 50px;">
  ${result}
</body>
</html>
`)
