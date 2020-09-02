# `vue-cli-plugin-wyadmin`

> 微易管理后台通用插件

```shell

# vue create 时选择 eslint + prettier + lintOn(save&commit)
vue add wyadmin

```

## TODO:

<!-- package sort -->

* [ ] 初版发布
  - [ ] 使用文档编写 (包含编辑器配置)
  - [ ] 自动化脚本 - 修改 `~/.vuerc` preset 配置 (发布 npm && 开放体验 && 收集反馈)
  - [ ] 联系运维配置 Jenkins 环境的 `WYINS_WEBPACK_ALIOSS_PLUGIN_` 系列环境变量
* [ ] lint 规则测试与调整 - 微易定制化
  [ ] eslint
  [ ] prettier
  [ ] stylelint
* [ ] 【调研】eslint、prettier、stylelint 等依赖集成至 vue-cli-plugin-wyadmin 的 dependencies 中
  * 是否会影响 vscode 插件的代码提示功能
  * 是否对 npm 有版本要求
  * 删除用户项目中不必要的 devDependencies
