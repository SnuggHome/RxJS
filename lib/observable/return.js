'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = _return;

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var ReturnObservable = (function (_Observable) {
    function ReturnObservable(returnValue) {
        _classCallCheck(this, ReturnObservable);

        _Observable.call(this, null);
        this.returnValue = returnValue;
    }

    _inherits(ReturnObservable, _Observable);

    ReturnObservable.prototype.subscriber = function subscriber(observer) {
        observer['return'](this.returnValue);
    };

    return ReturnObservable;
})(_Observable3['default']);

function _return() {
    var returnValue = arguments[0] === undefined ? undefined : arguments[0];

    return new ReturnObservable(returnValue);
}

module.exports = exports['default'];
//# sourceMappingURL=return.js.map