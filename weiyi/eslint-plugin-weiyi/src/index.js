/**
 * @fileoverview weiyi eslint plugin
 * @author weiyi
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports.rules = requireIndex(__dirname + "/rules");

module.exports.configs = {
    'vue-admin': require('./configs/vue-admin'),
    'recommended': require('./configs/recommended'),
    'vue-recommended': require('./configs/vue-recommended')
}
