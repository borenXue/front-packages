/**
 * @fileoverview Rule to disallow dead protocol
 * @author weiyi
 * 
 * TODO: window.location.href = 'http://www.baidu.com'
 */

"use strict";

var _curry = require('lodash/curry');
var Utils = require('../utils');

function literalHandler(context, node) {
  var originText = context.getSourceCode().getText(node);
  var allowedDomansArr = context.options && context.options[0] && context.options[0] instanceof Array ? context.options[0] : []
  var resPashArr = context.options && context.options[1] && context.options[1] instanceof Array ? context.options[1] : []
  var validObj = Utils.thirdPartyResValidLiteral(originText, allowedDomansArr, resPashArr);
  var valid = validObj.valid,
    message = validObj.message;
  if (!valid) {
    context.report({
      node: node.key,
      loc: node.loc,
      message
    });
  }
}
var literalHandlerCurried = _curry(literalHandler)

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Don't Use third-party res.",
      category: "Variables",
      recommended: true,
      url: ""
    },
    schema: [{
      type: "array",
      items: {
        type: "string"
      }
    }, {
      type: "array",
      items: {
        type: "string"
      }
    }]
  },
  create: function(context) {
    return Utils.defineTemplateBodyVisitor(context, {
      VLiteral: literalHandlerCurried(context),
      VText: literalHandlerCurried(context),
    })
  }
}
