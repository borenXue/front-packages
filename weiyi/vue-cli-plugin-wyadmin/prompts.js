function getCiPrompts(pkg) {
  const prompts = []

  // gitlab 项目组
  prompts.push({
    type: 'list',
    name: 'gitlabProjectGroup',
    message: 'Select Weiyi Gitlab Project Group',
    choices: [
      {
        name: 'winbrokers-front',
        value: 'winbrokers-front',
        short: 'winbrokers-front',
      },
      {
        name: 'wy-front',
        value: 'wy-front',
        short: 'wy-front',
      },
    ]
  })

  // gitlab 仓库名
  prompts.push({
    type: 'input',
    name: 'gitlabProjectName',
    message: 'Input Weiyi Gitlab Project Name',
    validate: input => !!input,
    default: pkg.name,
  })

  prompts.push({
    type: 'confirm',
    name: 'enableSonarQubeAnalysis',
    message: 'enable SonarQube Analysis for Jenkinsfile',
    default: true,
  })

  // TODO: 目前规则, 直接使用 git 项目名 (经纪项目无 wb- 前缀)
  // TODO: 潜在风险: gitlab 项目组中有重名项目时如何处理, 会导致 /data/* 冲突 (winbrokers-front、wy-front)
  // TODO: 建议方案: 不同gitlab项目组 添加不同的前缀, eg: 经纪添加 wb-
  // nginx 指向的目录, eg: /data/management-finance
  prompts.push({
    type: 'input',
    name: 'directoryForNginx',
    message: 'Input the server directory for nginx, eg: /data/management-finance',
    validate: input => !!input,
    default: `/data/${pkg.name}`,
  })

  return prompts;
}

module.exports = pkg => {
  const prompts = []

  // CI 自动化相关
  prompts.push(...getCiPrompts(pkg))

  return prompts
}
