/* eslint-disable global-require */
/**
 * @fileoverview weiyi eslint plugin
 * @author weiyi
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex')

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports.rules = requireIndex(`${__dirname}/rules`)

module.exports.configs = {
  'vue-admin': require('./configs/vue-admin'),
  recommended: require('./configs/recommended'),
  'vue-recommended': require('./configs/vue-recommended'),
}
