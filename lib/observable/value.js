'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = value;

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var ValueObservable = (function (_Observable) {
    function ValueObservable(value) {
        _classCallCheck(this, ValueObservable);

        _Observable.call(this, null);
        this.value = value;
    }

    _inherits(ValueObservable, _Observable);

    ValueObservable.prototype.subscriber = function subscriber(observer) {
        observer.next(this.value);
        observer['return']();
    };

    return ValueObservable;
})(_Observable3['default']);

function value(value) {
    return new ValueObservable(value);
}

;
module.exports = exports['default'];
//# sourceMappingURL=value.js.map