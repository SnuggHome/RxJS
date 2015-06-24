define(['exports', 'module', './NextTickScheduler'], function (exports, module, _NextTickScheduler) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _NextTickScheduler2 = _interopRequire(_NextTickScheduler);

  var nextTick = new _NextTickScheduler2();
  module.exports = nextTick;
});