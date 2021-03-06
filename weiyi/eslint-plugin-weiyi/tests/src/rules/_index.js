const chalk = require('chalk')
const rules = require('requireindex')(__dirname)

const ok = process.platform === 'win32' ? '\u221A ' : '✓ '

console.log(chalk.greenBright.bold('\n测试通过的规则列表:'))
// eslint-disable-next-line
for (const key in rules) {
  console.log('\t', chalk.greenBright(ok), chalk.dim(key))
}
