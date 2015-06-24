define(['exports', 'module', './errorObject'], function (exports, module, _errorObject) {
    'use strict';

    module.exports = tryCatch;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _errorObj = _interopRequire(_errorObject);

    var tryCatchTarget;
    function tryCatcher() {
        try {
            return tryCatchTarget.apply(this, arguments);
        } catch (e) {
            _errorObj.e = e;
            return _errorObj;
        }
    }

    function tryCatch(fn) {
        tryCatchTarget = fn;
        return tryCatcher;
    }

    ;
});