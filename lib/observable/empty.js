'use strict';

exports.__esModule = true;
exports['default'] = empty;

var _Observable = require('../Observable');

var _Observable2 = babelHelpers.interopRequireDefault(_Observable);

var EMPTY = new _Observable2['default'](function (observer) {
    observer['return']();
});

function empty() {
    return EMPTY;
}

;
module.exports = exports['default'];
//# sourceMappingURL=empty.js.map