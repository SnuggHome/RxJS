'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

if (!_root2['default'].Symbol) {
    _root2['default'].Symbol = {};
}
if (!_root2['default'].Symbol.observer) {
    if (typeof _root2['default'].Symbol['for'] === 'function') {
        _root2['default'].Symbol.observer = _root2['default'].Symbol['for']('observer');
    } else {
        _root2['default'].Symbol.observer = '@@observer';
    }
}
exports['default'] = _root2['default'].Symbol.observer;
module.exports = exports['default'];
//# sourceMappingURL=Symbol_observer.js.map