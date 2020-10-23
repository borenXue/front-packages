const { RuleTester } = require('eslint')
const rule = require('../../../src/rules/vue-no-third-party-res')

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
})
/**
 * 生成 valid 集合
 */
const valid = []
const {
  thirdParty: { protocols, domains, exts, endstrs, file } = {},
} = require('../util')

protocols.forEach(protocol => {
  domains.forEach(domain => {
    exts.forEach(ext => {
      endstrs.forEach(endstr => {
        valid.push(`
          <template>
            <div>
              <span>${protocol}${domain}${file}${ext}${endstr}</span>
            </div>
          </template>
        `)
        valid.push(`
          <template>
            <div>
              <img src="${protocol}${domain}${file}${ext}${endstr}">
            </div>
          </template>
        `)
      })
    })
  })
})

valid.push(`
  <template>
    <div>
      <span>//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.html</span>
    </div>
  </template>
`)
valid.push(`
  <template>
    <div>
      <img src="//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.html">
    </div>
  </template>
`)

/**
 * invalid
 */
const invalid = []
const invalidUrls = [
  '//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  '//wpimg.winbaoxian.org/f778738c-e4f8-4870-b634-56703b4acafe.png',
  '//wpimg.winbaoxian.org/f778738c-e4f8-4870-b634-56703b4acafe.png?afefg',
  'https://wpimg.winbaoxian.org/f778738c-e4f8-4870-b634-56703b4acafe.png#defg',
]
invalidUrls.forEach(invalidUrl => {
  invalid.push({
    filename: 'test.vue',
    code: `
      <template>
        <div>
          <span>${invalidUrl}</span>
        </div>
      </template>
    `,
    errors: [
      {
        message: `invalid resource file: ${invalidUrl}`,
      },
    ],
  })
  invalid.push({
    filename: 'test.vue',
    code: `
      <template>
        <div>
          <img src="${invalidUrl}">
        </div>
      </template>
    `,
    errors: [
      {
        message: `invalid resource file: ${invalidUrl}`,
      },
    ],
  })
})

ruleTester.run('weiyi/vue-no-third-party-res', rule, {
  valid,
  invalid,
})
