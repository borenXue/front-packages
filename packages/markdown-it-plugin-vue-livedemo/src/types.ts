
export interface LiveDemoExtra {
  template?: string;
  style?: string;
  vueContent: string;
  script?: string;
  extra?: {
    [k: string]: any;
  }
}

export interface Window {
  hljs: any;

  Vue: any;

  LZString: any;

  ClipboardJS: any;
}
