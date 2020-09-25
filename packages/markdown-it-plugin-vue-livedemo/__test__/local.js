window.codeSandBoxDataFn = function (data, meta) {
  const pkg = data.files['package.json'].content;
  pkg.dependencies['element-ui'] = '2.13.2';

  const js = data.files['index.js'].content;
  data.files['index.js'].content = js.replace('// placeholder-after-vue-import', `
// placeholder-after-vue-import

import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
  `);

  return data;
}

window.codepenDataFn = function (data, meta) {
  data.html = data.html.replace('<!-- placeholder-code-start -->', `<script src="//unpkg.com/element-ui/lib/index.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"></link>

  <!-- placeholder-code-start -->
  `);
  return data;
}
