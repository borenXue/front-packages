
const rule = require('../../src/rules/no-third-party-res');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

/**
 * 生成 valid 集合
 */
const valid = []
const Utils = require('../util');

for (const protocol of Utils.thirdParty.protocols) {
  for (const domain of Utils.thirdParty.domains) {
    for (const ext of Utils.thirdParty.exts) {
      for (const endstr of Utils.thirdParty.endstrs) {
        valid.push(`var a = '${protocol}${domain}${Utils.thirdParty.file}${ext}${endstr}';`)
        valid.push(`var a = \`${protocol}${domain}${Utils.thirdParty.file}${ext}${endstr}\`;`)
      }
    }
  }
}
valid.push("var a = '//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.html';",)
valid.push("var a = '//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe';",)

/**
 * invalid
 */
const invalid = []
const invalidUrls = [
  "//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  "//wpimg.winbaoxian.org/f778738c-e4f8-4870-b634-56703b4acafe.png",
  "//wpimg.winbaoxian.org/f778738c-e4f8-4870-b634-56703b4acafe.png?afefg",
  "https://wpimg.winbaoxian.org/f778738c-e4f8-4870-b634-56703b4acafe.png#defg",
]
for (const invalidUrl of invalidUrls) {
  invalid.push({
    code: `var a = '${invalidUrl}';`,
    errors: [{
      message: `invalid resource file: ${invalidUrl}`,
      type: 'Literal'
    }]
  })
  // es6
  invalid.push({
    code: `var a = \`${invalidUrl}\`;`,
    errors: [{
      message: `invalid resource file: ${invalidUrl}`,
      type: 'TemplateLiteral'
    }]
  })
}

ruleTester.run('weiyi/no-third-party-res', rule, {
    valid,
    invalid,
})
