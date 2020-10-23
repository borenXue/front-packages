const urlRegex = require('url-regex')
const urlParse = require('url-parse')

/**
 * dead-protocol 规则相关
 */

module.exports.deadProtocolMessages = {
  deadHttp: 'Avoid using the string "http://"',
  deadHttps: 'Avoid using the string "https://"',
}

module.exports.deadProtocolValidAndFixLiteral = function deadProtocolValidAndFixLiteral(
  str,
) {
  const obj = {
    valid: false,
    fixStr: '',
    messageId: '',
  }
  if (str.indexOf('http://') >= 0) {
    obj.valid = false
    obj.messageId = 'deadHttp'
    obj.fixStr = str.replace(/http:\/\//g, '//')
  } else if (str.indexOf('https://') >= 0) {
    obj.valid = false
    obj.messageId = 'deadHttps'
    obj.fixStr = str.replace(/https:\/\//g, '//')
  } else {
    obj.valid = true
  }
  return obj
}

/**
 * third-party-res 规则相关相关
 */

const thirdPartyResHostRegex = [/winbaoxian\.(cn|com)/]
const thirdPartyResPathRegex = [/\.(gif|png|jpg|jpeg|webp|js|css|json)$/]

function getFixUrlComma(str) {
  // 去除首位、末位的单引号、双引号
  return str
    .replace(/^'/, '')
    .replace(/'$/, '')
    .replace(/^"/, '')
    .replace(/"$/, '')
    .replace(/^`/, '')
    .replace(/`$/, '')
}

function isMathed(val, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (new RegExp(arr[i]).test(val)) return true
  }
  return false
}

module.exports.thirdPartyResValidLiteral = function thirdPartyResValidLiteral(
  str,
  allowedDomansArr,
  resPashArr,
) {
  const obj = {
    valid: true,
    message: '',
  }
  const result = str.match(urlRegex())
  if (result && result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      const urlParseObj = urlParse(result[i])
      const pathname = getFixUrlComma(urlParseObj.pathname)
      const href = getFixUrlComma(urlParseObj.href)
      if (
        !isMathed(
          urlParseObj.hostname,
          allowedDomansArr || thirdPartyResHostRegex,
        ) &&
        isMathed(pathname, resPashArr || thirdPartyResPathRegex)
      ) {
        obj.valid = false
        obj.message = `invalid resource file: ${href}`
        return obj
      }
    }
  }
  return obj
}

/**
 * vue 助手
 */

module.exports.defineTemplateBodyVisitor = function defineTemplateBodyVisitor(
  context,
  templateBodyVisitor,
  scriptVisitor,
) {
  if (context.parserServices.defineTemplateBodyVisitor == null) {
    context.report({
      loc: { line: 1, column: 0 },
      message:
        'Use the latest vue-eslint-parser. See also https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error',
    })
    return {}
  }
  return context.parserServices.defineTemplateBodyVisitor(
    templateBodyVisitor,
    scriptVisitor,
  )
}
