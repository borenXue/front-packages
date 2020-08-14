var chalk = require('chalk');
var rules = require('requireindex')(__dirname);

const ok = process.platform === 'win32' ? '\u221A ' : '✓ '

console.log(chalk.greenBright.bold('\n测试通过的规则列表:'));
for (var i in rules) {
  console.log('\t', chalk.greenBright(ok) , chalk.dim(i));
}
console.log('');
