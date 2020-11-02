const { RuleTester } = require('eslint')
const rule = require('../../../src/rules/no-third-party-res')

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })

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
        valid.push(`var a = '${protocol}${domain}${file}${ext}${endstr}';`)
        valid.push(`var a = \`${protocol}${domain}${file}${ext}${endstr}\`;`)
      })
    })
  })
})
valid.push({
  code: "var a = '//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.html';",
  options: [['winbaoxian\\.(cn|com)'], ['\\.(gif|png|jpg|jpeg|webp|js|css|json)$']],
})
valid.push({
  code: "var a = '//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe';",
  options: [['winbaoxian\\.(cn|com)'], ['\\.(gif|png|jpg|jpeg|webp|js|css|json)$']],
})

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
    code: `var a = '${invalidUrl}';`,
    options: [['winbaoxian\\.(cn|com)'], ['\\.(gif|png|jpg|jpeg|webp|js|css|json)$']],
    errors: [
      {
        message: `invalid resource file: ${invalidUrl}`,
        type: 'Literal',
      },
    ],
  })
  // es6
  invalid.push({
    code: `var a = \`${invalidUrl}\`;`,
    options: [['winbaoxian\\.(cn|com)'], ['\\.(gif|png|jpg|jpeg|webp|js|css|json)$']],
    errors: [
      {
        message: `invalid resource file: ${invalidUrl}`,
        type: 'TemplateLiteral',
      },
    ],
  })
})

ruleTester.run('weiyi/no-third-party-res', rule, {
  valid,
  invalid,
})
