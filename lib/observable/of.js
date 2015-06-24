'use strict';

exports.__esModule = true;
exports['default'] = of;

var _ArrayObservable = require('./ArrayObservable');

var _ArrayObservable2 = babelHelpers.interopRequireDefault(_ArrayObservable);

function of() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
    }

    return new _ArrayObservable2['default'](values);
}

;
module.exports = exports['default'];
//# sourceMappingURL=of.js.map