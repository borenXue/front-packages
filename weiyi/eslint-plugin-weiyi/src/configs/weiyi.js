module.exports = {
  plugins: ['weiyi'],
  rules: {
    'weiyi/no-dead-protocol': 'error',
    'weiyi/no-third-party-res': [
      'error',
      ['winbaoxian.(cn|com)'],
      ['.(gif|png|jpg|jpeg|webp|js|css|json)$'],
    ],
  },
}
