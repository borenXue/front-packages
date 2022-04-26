# 开发指南

* [lerna 开发与发布流程](https://juejin.cn/post/6992213605869420552)

```shell
# 初始化依赖
./node_modules/.bin/lerna bootstrap

# 运行测试用例
./node_modules/.bin/lerna run test

# 新增一个包
./node_modules/.bin/lerna create webpack-multi-html-plugin packages

# 检查自上次发布以来哪些软件包被修改过
./node_modules/.bin/lerna changed
```
