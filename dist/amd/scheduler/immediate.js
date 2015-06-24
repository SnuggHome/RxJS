define(['exports', 'module', './Scheduler'], function (exports, module, _Scheduler) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _Scheduler2 = _interopRequire(_Scheduler);

  var immediate = new _Scheduler2();
  module.exports = immediate;
});