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
  const allowedDomansArr =
    context.options && context.options[0] && context.options[0] instanceof Array
      ? context.options[0]
      : []
  const resPashArr =
    context.options && context.options[1] && context.options[1] instanceof Array
      ? context.options[1]
      : []
  if (typeof value === 'string') {
    const validObj = Utils.thirdPartyResValidLiteral(
      value,
      allowedDomansArr,
      resPashArr,
    )
    if (!validObj.valid) {
      context.report({
        node,
        message: validObj.message,
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
    return {
      Literal: literalHandlerCurried(context)(false),
      TemplateLiteral: literalHandlerCurried(context)(true),
    }
  },
}
