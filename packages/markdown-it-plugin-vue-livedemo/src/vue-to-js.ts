import { createDefaultCompiler, assemble } from '@vue/component-compiler';

export default function vueToJS(str: string, componentUuid: string) {
  const vueCompiler = createDefaultCompiler({
    style: {
      postcssPlugins: [require('autoprefixer')],
    },
  });
  const descriptorCompileResult = vueCompiler.compileToDescriptor('abc.vue', str);
  (descriptorCompileResult.styles || []).forEach((item) => delete item.map);
  const assembleResults = assemble(vueCompiler, 'abc.vue', descriptorCompileResult);

  const jsStr = assembleResults.code.replace('export default __vue_component__', 'window[componentUuid] = __vue_component__');
  return `
    (function (componentUuid) {
      ${jsStr}
    })('${componentUuid}');
  `;
}
