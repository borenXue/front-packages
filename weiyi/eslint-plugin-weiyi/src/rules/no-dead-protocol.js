/**
 * @fileoverview Rule to disallow dead protocol
 * @author weiyi
 *
 * TODO: window.location.href = 'http://www.baidu.com'
 */

const curry = require('lodash/curry')
const Utils = require('../utils')

function literalHandler(context, isTemplate, node) {
  const value = context.getSourceCode().getText(node)
  if (typeof value === 'string' && value) {
    const validObj = Utils.deadProtocolValidAndFixLiteral(value)
    const { valid } = validObj
    const { fixStr } = validObj
    const { messageId } = validObj
    if (!valid) {
      context.report({
        node,
        message: Utils.deadProtocolMessages[messageId],
        fix(fixer) {
          return fixer.replaceText(node, fixStr)
        },
      })
    }
  }
}
const literalHandlerCurried = curry(literalHandler)

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Use window.location.protocol instead of 'http:' or 'https:'",
      category: 'Variables',
      recommended: true,
      url: '',
    },
    messages: Utils.deadProtocolMessages,
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      Literal: literalHandlerCurried(context)(false),
      TemplateLiteral: literalHandlerCurried(context)(true),
    }
  },
}
