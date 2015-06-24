define(['exports', 'module', '../Observable'], function (exports, module, _Observable) {
    'use strict';

    module.exports = merge;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _Observable2 = _interopRequire(_Observable);

    function merge(observables) {
        return _Observable2.fromArray([this].concat(observables)).mergeAll();
    }
});