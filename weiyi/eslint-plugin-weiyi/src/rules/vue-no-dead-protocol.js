/**
 * @fileoverview Rule to disallow dead protocol
 * @author weiyi
 *
 */

const curry = require('lodash/curry')
const Utils = require('../utils')

function literalHandler(context, node) {
  const originText = context.getSourceCode().getText(node)
  const validObj = Utils.deadProtocolValidAndFixLiteral(originText)
  const { valid } = validObj
  const { fixStr } = validObj
  const { messageId } = validObj
  if (!valid) {
    context.report({
      node: node.key,
      loc: node.loc,
      message: Utils.deadProtocolMessages[messageId],
      fix(fixer) {
        return fixer.replaceText(node, fixStr)
      },
    })
  }
}
const literalHandlerCurried = curry(literalHandler)

//------------------------------------------------------------------------------
// Rule  Definition
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
    return Utils.defineTemplateBodyVisitor(context, {
      VLiteral: literalHandlerCurried(context),
      VText: literalHandlerCurried(context),
    })
  },
}
