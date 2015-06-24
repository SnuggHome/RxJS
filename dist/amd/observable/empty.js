define(['exports', 'module', '../Observable'], function (exports, module, _Observable) {
    'use strict';

    module.exports = empty;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _Observable2 = _interopRequire(_Observable);

    var EMPTY = new _Observable2(function (observer) {
        observer['return']();
    });

    function empty() {
        return EMPTY;
    }

    ;
});