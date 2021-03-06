'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = tryCatch;

var _errorObject = require('./errorObject');

var _errorObject2 = _interopRequireDefault(_errorObject);

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    } catch (e) {
        _errorObject2['default'].e = e;
        return _errorObject2['default'];
    }
}

function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

;
module.exports = exports['default'];
//# sourceMappingURL=tryCatch.js.map