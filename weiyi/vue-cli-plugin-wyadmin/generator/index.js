const fs = require('fs');
const path = require('path');
const { getOSSPluginOptions, warn } = require('../helper');

const config = {
  lint: true,
  ci: true,
  oss: true,
}

module.exports = (api, {
  gitlabProjectName,
  gitlabProjectGroup,
  directoryForNginx,
  enableSonarQubeAnalysis,
}) => {
  const pkg = require(api.resolve('./package.json'))

  api.extendPackage({
    weiyi: {
      // invokeInited: true,
      gitlabProjectName: gitlabProjectName || '',
      gitlabProjectGroup: gitlabProjectGroup || '',
      oss: false,
    }
  })

  if (gitlabProjectName) {
    api.extendPackage({
      name: gitlabProjectName,
    })
  }

  if (config.oss) {
    const pkgWeiyiOss = gitlabProjectGroup === 'winbrokers-front' ? 'WYINS_' : true
    api.extendPackage({
      weiyi: {
        oss: pkgWeiyiOss
      }
    })

    const pkg = require(api.resolve('./package.json'));
    const [options, publicPath] = getOSSPluginOptions(pkgWeiyiOss)
    if (!fs.existsSync(api.resolve('./vue.config.js'))) {
      api.render(files => files['vue.config.js'] = `
        module.exports = {
          publicPath: process.env.NODE_ENV === 'production' ? \`${publicPath}/\$\{require('./package.json').name\}\` : '/'
        }
      `)
    } else {
      // TODO: 修改 vue.config.js
      warn('需手动修改 vue.config.js 中的 publicPath (webpack-alioss-plugin 插件需要)')
    }
  }

  api.render('./template/others');
  if (config.lint) {
    api.render('./template/lint');

    api.extendPackage({
      scripts: {
        "lint": "npm-run-all --parallel lint:**",
        "lint:eslint": "cross-env NODE_ENV=production vue-cli-service lint",
        "lint:style-prettier": "cross-env NODE_ENV=production prettier **/*.{html,vue,css,sass,scss,less} --write --ignore-path ./.gitignore",
        "lint:style-stylelint": "cross-env NODE_ENV=production stylelint **/*.{html,vue,css,sass,scss,less} --ignore-path .gitignore --fix"
      },
      'lint-staged': {
        '*.{js,jsx,vue}': [
          'npm run lint:eslint',
          'git add',
        ],
        '*.{html,vue,css,sass,scss,less}': [
          'cross-env NODE_ENV=production prettier --ignore-path ./.gitignore --write',
          'cross-env NODE_ENV=production stylelint --ignore-path .gitignore --fix',
          'git add',
        ],
      },
      devDependencies: {
        // TODO: eslint、prettier 已存在, 暂时不考虑在这里更新 (后续考虑到版本升级, 可能会在这里更新其版本)
        // TODO: 删除 @vue/eslint-config-prettier
        // TODO: 使用 @vue/eslint-config-prettier 替换 eslint-plugin-weiyi 中的 prettier 相关配置
        // "eslint-config-prettier": "^6.11.0",
        // "eslint-config-standard": "^14.1.1",
        // "eslint-plugin-prettier": "^3.1.4",
        "eslint-plugin-weiyi": "^1.5.0",
        // eslint-config-standard 插件的额外依赖
        // "eslint-plugin-import": "^2.22.0",
        // "eslint-plugin-node": "^11.1.0",
        // "eslint-plugin-promise": "^4.2.1",
        // "eslint-plugin-standard": "^4.0.1",
        // stylelint 相关
        "stylelint": "^13.6.1",
        "stylelint-config-weiyi": "^0.0.4",
      },
    });
  }

  if (config.ci) {
    const pname = gitlabProjectGroup === 'winbrokers-front' ? `wb-${gitlabProjectName}` : gitlabProjectName;
    const dir = /\/$/.test(directoryForNginx) ? directoryForNginx : `${directoryForNginx}/` ;
    api.render('./template/ci', {
      gitlabProjectNameWithoutWb: gitlabProjectName,
      gitlabProjectName: pname,
      gitlabProjectGroup,
      // TODO: 去除该选项, 使用 gitlabProjectNameWithoutWb
      directoryForNginx: dir,
      enableSonarQubeAnalysis,
    });
  }
}
