/**
 * @fileoverview Rule to disallow dead protocol
 * @author weiyi
 * 
 * TODO: window.location.href = 'http://www.baidu.com'
 */

"use strict";

var _curry = require('lodash/curry');
var Utils = require('../utils');

function literalHandler(context, isTemplate, node) {
  var value = context.getSourceCode().getText(node);
  if (typeof value === 'string' && value) {
    var validObj = Utils.deadProtocolValidAndFixLiteral(value);
    var valid = validObj.valid,
      fixStr = validObj.fixStr,
      messageId = validObj.messageId;
    if (!valid) {
      context.report({
        node: node,
        message: Utils.deadProtocolMessages[messageId],
        fix: function(fixer) {
          return fixer.replaceText(node, fixStr);
        }
      });
    }
  }
}
var literalHandlerCurried = _curry(literalHandler)

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Use window.location.protocol instead of 'http:' or 'https:'",
      category: "Variables",
      recommended: true,
      url: ''
    },
    messages: Utils.deadProtocolMessages,
    fixable: "code",
    schema: []
  },
  create: function(context) {
    return {
      Literal: literalHandlerCurried(context)(false),
      TemplateLiteral: literalHandlerCurried(context)(true),
    };
  }
}
