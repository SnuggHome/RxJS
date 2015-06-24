define(['exports', 'module', './root'], function (exports, module, _root) {
    'use strict';

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _root2 = _interopRequire(_root);

    if (!_root2.Symbol) {
        _root2.Symbol = {};
    }
    if (!_root2.Symbol.observer) {
        if (typeof _root2.Symbol['for'] === 'function') {
            _root2.Symbol.observer = _root2.Symbol['for']('observer');
        }
        _root2.Symbol.observer = '@@observer';
    }
    module.exports = _root2.Symbol.observer;
});