'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = empty;

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var EMPTY = new _Observable2['default'](function (observer) {
    observer['return']();
});

function empty() {
    return EMPTY;
}

;
module.exports = exports['default'];
//# sourceMappingURL=empty.js.map