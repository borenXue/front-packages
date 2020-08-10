import fs from 'fs';
import path from 'path';

module.exports = (api: any) => {

  const exist = configFileExist();
  if (exist) {
    console.warn(`Skipped create config files, because the file ${exist} exist.`)
  } else {
    api.render('./template');
  }

  api.extendPackage({
    scripts: {
      serve: 'cross-env X_ENV=development NODE_ENV=development vue-cli-service serve',
      build: 'cross-env X_ENV=development NODE_ENV=development vue-cli-service build',
      'build:test': 'cross-env X_ENV=test NODE_ENV=production vue-cli-service build',
      'build:online': 'cross-env X_ENV=online NODE_ENV=production vue-cli-service build',
      lint: 'cross-env NODE_ENV=production vue-cli-service lint'
    },
    dependencies: {
      'cross-env': '^7.0.2'
    }
  });
}

function configFileExist() {
  const dir = path.resolve(process.cwd(), 'config');
  if (fs.existsSync(path.resolve(dir, 'development.env.js'))) return 'config/development.env.js';
  if (fs.existsSync(path.resolve(dir, 'test.env.js'))) return 'config/test.env.js';
  if (fs.existsSync(path.resolve(dir, 'online.env.js'))) return 'config/online.env.js';
  return false;
}
