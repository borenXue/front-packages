const chalk = require('chalk')
const rules = require('requireindex')(__dirname)

const ok = process.platform === 'win32' ? '\u221A ' : '✓ '

console.log(chalk.greenBright.bold('\n测试通过的规则列表:'))
// for (const i in rules) {
rules.forEach(rule => {
  console.log('\t', chalk.greenBright(ok), chalk.dim(rule))
})
console.log('')
