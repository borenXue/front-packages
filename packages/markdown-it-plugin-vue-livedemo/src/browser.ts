import { LiveDemoExtra } from './types';

let fixedControllerBarZIndex = 1000;

export function compressForCodeSandBox(string: string) {
  return window.LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

export function setupVueLiveDemoItem(element: HTMLElement, id: string, vueComponent: any, liveDemoExtraStr: string) {
  if (element.dataset.setup === 'true') return;
  const liveDemoExtra: LiveDemoExtra = liveDemoExtraStr ? JSON.parse(window.decodeURIComponent(liveDemoExtraStr)) : {};

  element.onmouseover = () => classAdd(element, 'hover');
  element.onmouseenter = () => classAdd(element, 'hover');
  element.onmouseleave = () => classRemove(element, 'hover');
  element.onmouseout = () => classRemove(element, 'hover');

  const sourceBoxEle = element.querySelector('.source-box') as HTMLElement;
  if (!sourceBoxEle) throw new Error('.source-box 不存在');
  const controlBarEle = element.querySelector('.conrol-bar') as HTMLElement;
  if (!controlBarEle) throw new Error('.conrol-box 不存在');
  // @ts-ignore
  const svgWrapperList = controlBarEle.querySelectorAll('.svg-wrapper') as HTMLElement[];
  const sourceBoxPre = sourceBoxEle.querySelector('pre') as HTMLElement;
  const sourceBoxCode = sourceBoxEle.querySelector('pre > code') as HTMLElement;

  controlBarEle.onmouseover = () => classAdd(controlBarEle, 'hover');
  controlBarEle.onmouseenter = () => classAdd(controlBarEle, 'hover');
  controlBarEle.onmouseleave = () => classRemove(controlBarEle, 'hover');
  controlBarEle.onmouseout = () => classRemove(controlBarEle, 'hover');
  controlBarEle.onclick = () => {
    if (element.dataset.openSource === 'true') {
      classRemove(element, 'open-source');
      element.dataset.openSource = 'false';
      sourceBoxEle.setAttribute('style', 'height: 0;');
    } else {
      classAdd(element, 'open-source');
      element.dataset.openSource = 'true';
      sourceBoxEle.setAttribute('style', `height: ${sourceBoxPre.clientHeight}px;`);
    }
    let tempIntervalId = setInterval(() => {
      scrollHandler(true);
    }, 20);
    setTimeout(() => {
      clearInterval(tempIntervalId);
      tempIntervalId = undefined as any;
    }, 300);
  };
  // @ts-ignore
  window!.hljs.highlightBlock(sourceBoxCode);

  // eslint-disable-next-line
  for (let svgWrapperI = 0; svgWrapperI < svgWrapperList.length; svgWrapperI++) {
    // eslint-disable-next-line
    let svgWrapper = svgWrapperList[svgWrapperI];
    svgWrapper.onmouseover = () => classAdd(svgWrapper, 'hover');
    svgWrapper.onmouseenter = () => classAdd(svgWrapper, 'hover');
    svgWrapper.onmouseleave = () => classRemove(svgWrapper, 'hover');
    svgWrapper.onmouseout = () => classRemove(svgWrapper, 'hover');
    const tipToast = svgWrapper.querySelector('.tip-toast') as HTMLElement;
    const tipToastLeft = (tipToast.clientWidth - svgWrapper.clientWidth) / 2;
    tipToast.setAttribute('style', `left: -${tipToastLeft}px;`);
    svgWrapper.onclick = (e) => {
      e.stopPropagation();
      let action = svgWrapper.dataset.action;
      if (action === 'codepen') actionCodepen(liveDemoExtra);
      if (action === 'copy') actionCopy(element);
      if (action === 'codesandbox') actionCodeSandBox(liveDemoExtra);
    };
  }

  // @ts-ignore
  new window.Vue({
    el: element.querySelector('.live-box-app'),
    render: (h: Function) => h(vueComponent),
  });

  let scrollerBox = liveDemoExtra.config.scroller && typeof liveDemoExtra.config.scroller === 'string'
      ? document.querySelector(liveDemoExtra.config.scroller) || document.documentElement
      : document.documentElement;

  // 使 controlBarEle 元素固定
  (scrollerBox === document.documentElement ? window : scrollerBox).addEventListener('scroll', scrollHandler as any);

  function scrollHandler(notCheckOpenStatus: boolean) {
    if (notCheckOpenStatus !== true) {
      if (!classHas(element, 'open-source')) {
        return;
      }
    }

    const documentWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const height = scrollerBox.clientHeight;
    const controlBarOffsetTop = sourceBoxEle.offsetTop + sourceBoxEle.clientHeight;

    if (controlBarOffsetTop - (height + scrollerBox.scrollTop) >= controlBarEle.clientHeight) {
      if (!controlBarEle.getAttribute('style')) {
        // eslint-disable-next-line
        controlBarEle.setAttribute(
          'style',
          `
          position: fixed;
          bottom: 0;
          z-index: ${fixedControllerBarZIndex++};
          left: ${element.getBoundingClientRect().x + 1}px;
          right: ${documentWidth - element.getBoundingClientRect().x - element.clientWidth}px;
        `,
        );
      }
      if (controlBarEle.getAttribute('style') && sourceBoxEle.getBoundingClientRect().y + controlBarEle.clientHeight > documentHeight) {
        controlBarEle.setAttribute('style', '');
      }
    } else {
      controlBarEle.setAttribute('style', '');
    }
  }

  element.dataset.setup = 'true';
}

export function actionCopy(element: HTMLElement) {
  const ele = element.querySelector('textarea.copy-box');
  (ele as any).select();
  if (typeof document.execCommand === 'function') {
    document.execCommand('copy');
  }
}

export function actionCodepen(liveDemoExtra: LiveDemoExtra) {
  const htmlContent = `
    <div id="app">
      ${liveDemoExtra.template}
    </div>
  `;
  const styleContent = liveDemoExtra.style || '';
  const jsContent = `
    ${(liveDemoExtra.script || '').replace('export default ', 'var Main = ')}
    var Ctor = Vue.extend(Main)
    new Ctor().$mount('#app')
  `;
  const originInputValue = {
    js: jsContent,
    css: styleContent,
    css_pre_processor: liveDemoExtra.styleLang || 'none',
    html: `<script src="//unpkg.com/vue/dist/vue.js">${'</'}script>
<!-- placeholder-code-start -->


${htmlContent}


<!-- placeholder-code-end -->`,
  };

  let inputValue = undefined;
  if (
    liveDemoExtra.config.codepenDataFn
    && typeof liveDemoExtra.config.codepenDataFn === 'string'
    && window[liveDemoExtra.config.codepenDataFn]
    && typeof window[liveDemoExtra.config.codepenDataFn] === 'function'
  ) {
    // @ts-ignore
    inputValue = window[liveDemoExtra.config.codepenDataFn](originInputValue, liveDemoExtra)
  }

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://codepen.io/pen/define/';
  form.target = '_blank';
  form.style.display = 'none';

  const input = document.createElement('input');
  input.setAttribute('name', 'data');
  input.setAttribute('type', 'hidden');
  input.setAttribute('value', JSON.stringify(inputValue || originInputValue));

  form.appendChild(input);
  document.body.appendChild(form);

  form.submit();
}

export function actionCodeSandBox(liveDemoExtra: LiveDemoExtra) {
  const pkg = {
    version: '0.0.1',
    main: 'index.js',
    dependencies: {
      'vue': '2.6.12'
    },
    devDependencies: {},
    scripts: {},
  };
  const originConfig = {
    files: {
      'package.json': { content: pkg },
      'index.scss': { content: `
        ${liveDemoExtra.style || ''}
      ` },
      'index.js': { content: `import Vue from 'vue/dist/vue.common.js';
import "./index.scss";
// placeholder-after-vue-import
${(liveDemoExtra.script || '').replace('export default ', 'var Main = ')}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
` },
      'index.html': { content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    ${liveDemoExtra.template}
  </div>
</body>
</html>
`, },
    }
  };
  let config = undefined;
  if (
    liveDemoExtra.config.codeSandBoxDataFn
    && typeof liveDemoExtra.config.codeSandBoxDataFn === 'string'
    && window[liveDemoExtra.config.codeSandBoxDataFn]
    && typeof window[liveDemoExtra.config.codeSandBoxDataFn] === 'function'
  ) {
    // @ts-ignore
    config = window[liveDemoExtra.config.codeSandBoxDataFn](originConfig, liveDemoExtra);
  }
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
  form.target = '_blank';
  form.style.display = 'none';

  const input = document.createElement('input');
  input.setAttribute('name', 'parameters');
  input.setAttribute('type', 'hidden');
  input.setAttribute('value', compressForCodeSandBox(JSON.stringify(config || originConfig)));

  form.appendChild(input);
  document.body.appendChild(form);

  form.submit();
}

export function classAdd(ele: HTMLElement, cls: string) {
  let old = ele.getAttribute('class') || '';
  old = old.replace(new RegExp(`\\b${cls}\\b`, 'g'), '');
  ele.setAttribute('class', `${old.trim()} ${cls}`);
}
export function classRemove(ele: HTMLElement, cls: string) {
  let old = ele.getAttribute('class') || '';
  old = old.replace(new RegExp(`\\b${cls}\\b`, 'g'), '');
  ele.setAttribute('class', old);
}
export function classHas(ele: HTMLElement, cls: string) {
  return new RegExp(`\\b${cls}\\b`, 'g').test(ele.getAttribute('class') || '');
}
