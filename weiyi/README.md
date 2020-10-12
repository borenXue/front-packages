# 微易相关工具

* [eslint-plugin-weiyi](https://www.npmjs.com/package/eslint-plugin-weiyi): 微易 eslint 插件
* [stylelint-config-weiyi](https://www.npmjs.com/package/stylelint-config-weiyi): 微易 stylelint 插件
* [vue-cli-plugin-wyadmin](https://www.npmjs.com/package/vue-cli-plugin-wyadmin): 微易 vue-cli 管理后台初始化插件

## 通过 vue-cli 及 config、wyadmin 插件初始化一个管理后台项目

```bash

# 第一步: 使用 vue-cli 新建一个项目, 选择如下:
#     Babel + router + Vuex + CSS Pre-processors + Linter/Formatter
#     Sass/SCSS (with dart-sass)
#     Eslint-Prettier
#     Lint on save && Lint and fix on commit
#     In dedicated config files
vue create your-admin-project

# 第二步: 安装 config 插件 && commit
vue add config
git commit -am "chore(init): vue add config"

# 第三步: 安装 wyadmin 插件 && commit
#   问题一: 该项目归属于科技还是经纪, wy-front 为科技, winbrokers-front 为经纪
#               OSS 上传的 bucket、keyId、keySecret 不同, 科技为 wyres bucket, 经纪为 winbres bucket
#               CI 中使用的目录不同, 经纪前面会添加 wb- 前缀
#   问题二: Gitlab 项目名, 最好与 gitlab 中的项目名保持一致, 默认取 package.json 中的 name 值
#               OSS 会自动上传至 auto_upload_ci/${gitlab_project_name} 目录
#               CI 部署时的相关目录名也会使用该值
#   问题三: enable SonarQube Analysis, Jenkinsfile 中是否包含 SonarQube Analysis, 默认包含
#   问题三: 最终服务器存放的目录, 即 nginx 映射域名到该目录, 一般使用 /data/${gitlab_project_name} 目录
vue add wyadmin
git commit -am "chore(init): vue add wyadmin"

```

## 添加 vue-cli 预设

修改 `~/.vuerc` 文件, 添加 `weiyi-admin` 的 presets

```json
// ~/.vuerc

{
  // ...
  "presets": {
    // ... 其他 preset
    "weiyi-admin": {
      "useConfigFiles": true,
      "cssPreprocessor": "dart-sass",
      "plugins": {
        "@vue/cli-plugin-babel": {},
        "@vue/cli-plugin-router": {
          "historyMode": false
        },
        "@vue/cli-plugin-vuex": {},
        "@vue/cli-plugin-eslint": {
          "config": "prettier",
          "lintOn": [
            "save",
            "commit"
          ]
        },
        "vue-cli-plugin-config": {}
      }
    }
  }
}
```

创建新项目时, 先使用 `weiyi-admin` 预设来自动初始化项目, 再手动添加 `vue-cli-plugin-wyadmin` 插件:

```shell
# 1、创建项目
vue create your-project

# 2、添加 wyadmin 插件
#     依次输入问题的回答即可, 具体问题参考上方
vue add wyadmin
git commit -am "chore(init): vue add wyadmin"
```

<!--
npm i -D vue-loader
rm -rf node_modules/@vue/cli-service/node_modules/vue-loader

TODO:
eslint 输出结果美化
-->
