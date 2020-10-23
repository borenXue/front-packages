/**
 * @fileoverview Rule to disallow dead protocol
 * @author weiyi
 *
 * TODO: window.location.href = 'http://www.baidu.com'
 */

const curry = require('lodash/curry')
const Utils = require('../utils')

function literalHandler(context, node) {
  const originText = context.getSourceCode().getText(node)
  const allowedDomansArr =
    context.options && context.options[0] && context.options[0] instanceof Array
      ? context.options[0]
      : []
  const resPashArr =
    context.options && context.options[1] && context.options[1] instanceof Array
      ? context.options[1]
      : []
  const validObj = Utils.thirdPartyResValidLiteral(
    originText,
    allowedDomansArr,
    resPashArr,
  )
  const { valid } = validObj
  const { message } = validObj
  if (!valid) {
    context.report({
      node: node.key,
      loc: node.loc,
      message,
    })
  }
}
const literalHandlerCurried = curry(literalHandler)

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Don't Use third-party res.",
      category: 'Variables',
      recommended: true,
      url: '',
    },
    schema: [
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  },
  create(context) {
    return Utils.defineTemplateBodyVisitor(context, {
      VLiteral: literalHandlerCurried(context),
      VText: literalHandlerCurried(context),
    })
  },
}
