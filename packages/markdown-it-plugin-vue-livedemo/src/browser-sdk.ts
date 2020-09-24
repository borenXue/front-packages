export * from './browser';

import LZString from 'lz-string';

import hljs from 'highlight.js/lib/core.js';
import css from 'highlight.js/lib/languages/css.js';
import xml from 'highlight.js/lib/languages/xml.js';
import scss from 'highlight.js/lib/languages/scss.js';
import htmlbars from 'highlight.js/lib/languages/htmlbars.js';
import vbscriptHtml from 'highlight.js/lib/languages/vbscript-html.js';
import javascript from 'highlight.js/lib/languages/javascript.js';
import typescript from 'highlight.js/lib/languages/typescript.js';

import './index.scss';
import 'highlight.js/scss/default.scss';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('htmlbars', htmlbars);
hljs.registerLanguage('vbscriptHtml', vbscriptHtml);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);

(window as any).LZString = LZString;
(window as any).hljs = hljs;
