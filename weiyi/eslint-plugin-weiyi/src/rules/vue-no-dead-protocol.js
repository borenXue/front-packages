/**
 * @fileoverview Rule to disallow dead protocol
 * @author weiyi
 * 
 */

"use strict";

var _curry = require('lodash/curry');
var Utils = require('../utils');

function literalHandler(context, node) {
  var originText = context.getSourceCode().getText(node);
  var validObj = Utils.deadProtocolValidAndFixLiteral(originText);
  var valid = validObj.valid,
    fixStr = validObj.fixStr,
    messageId = validObj.messageId;
  if (!valid) {
    context.report({
      node: node.key,
      loc: node.loc,
      message: Utils.deadProtocolMessages[messageId],
      fix: function(fixer) {
        return fixer.replaceText(node, fixStr);
      }
    });
  }
}
var literalHandlerCurried = _curry(literalHandler)

//------------------------------------------------------------------------------
// Rule  Definition
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
  create(context) {
    return Utils.defineTemplateBodyVisitor(context, {
      VLiteral: literalHandlerCurried(context),
      VText: literalHandlerCurried(context),
    })
  }
}
