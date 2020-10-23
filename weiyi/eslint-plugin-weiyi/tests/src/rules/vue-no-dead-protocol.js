const { RuleTester } = require('eslint')
const rule = require('../../../src/rules/vue-no-dead-protocol')

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
})

ruleTester.run('weiyi/vue-no-dead-protocol', rule, {
  valid: [
    // html 属性值
    `
      <template>
        <div>
          <img src="//a.b.com/def.gif">
        </div>
      </template>
    `,
    // html 元素内容
    `
      <template>
        <div>
          <span>//a.b.com/def.gif</span>
        </div>
      </template>
    `,
  ],
  invalid: [
    // html 属性值含 http://
    {
      filename: 'test.vue',
      code: `
          <template>
            <div>
              <img src="http://a.b.com/def.gif">
            </div>
          </template>
        `,
      output: `
          <template>
            <div>
              <img src="//a.b.com/def.gif">
            </div>
          </template>
        `,
      errors: [{ messageId: 'deadHttp' }],
    },
    // html 元素内容含 https://
    {
      filename: 'test.vue',
      code: `
          <template>
            <div>
              <span>https://a.b.com/def.gif</span>
            </div>
          </template>
        `,
      output: `
          <template>
            <div>
              <span>//a.b.com/def.gif</span>
            </div>
          </template>
        `,
      errors: [{ messageId: 'deadHttps' }],
    },
  ],
})
