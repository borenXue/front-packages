const { RuleTester } = require('eslint')
const rule = require('../../../src/rules/no-dead-protocol')

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })

ruleTester.run('weiyi/no-dead-protocol', rule, {
  valid: [
    // eslint-disable-next-line no-template-curly-in-string
    'var a = `ht`;var b = `tp:`;var url = `${a}${b}//a.com`;',
    'var d = `htt:p//b.com`',
    // eslint-disable-next-line no-template-curly-in-string
    "var a = 'ht';var b = 'tp:';var url = '${a}${b}//a.com';",
    "var d = 'htt:p//b.com'",
  ],
  invalid: [
    {
      code: 'var url = `http://www.baidu.com`;',
      errors: [{ messageId: 'deadHttp', type: 'TemplateLiteral' }],
      output: 'var url = `//www.baidu.com`;',
    },
    {
      code: 'var url = `https://www.baidu.com`;',
      errors: [{ messageId: 'deadHttps', type: 'TemplateLiteral' }],
      output: 'var url = `//www.baidu.com`;',
    },
    /**
     * es5 赋值:
     *      单引号、双引号、http、https
     */
    {
      // http
      code: "var url = 'http://www.baidu.com';",
      output: "var url = '//www.baidu.com';",
      errors: [{ messageId: 'deadHttp', type: 'Literal' }],
    },
    {
      // https
      code: "var url = 'https://www.baidu.com';",
      output: "var url = '//www.baidu.com';",
      errors: [{ messageId: 'deadHttps', type: 'Literal' }],
    },
    {
      // 双引号
      code: 'var url = "http://www.baidu.com";',
      output: 'var url = "//www.baidu.com";',
      errors: [{ messageId: 'deadHttp', type: 'Literal' }],
    },
  ],
})
