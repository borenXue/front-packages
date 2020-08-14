module.exports = {
  extends: [
    'stylelint-config-primer',
    'stylelint-config-prettier',
  ],
  rules: {
    // 颜色相关
    'color-hex-length': 'short',
    'color-named': null,
    'color-no-invalid-hex': true,
    'color-no-hex': null,
    // 其他待分类
    'selector-max-id': 5,
    'selector-max-specificity': '5,4,0',
    'selector-max-type': 5,
    'selector-no-qualifying-type': null,
  }
}