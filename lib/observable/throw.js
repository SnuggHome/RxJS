'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = _throw;

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var ThrowObservable = (function (_Observable) {
    function ThrowObservable(err) {
        _classCallCheck(this, ThrowObservable);

        _Observable.call(this, null);
        this.err = err;
    }

    _inherits(ThrowObservable, _Observable);

    ThrowObservable.prototype.subscriber = function subscriber(observer) {
        observer['throw'](this.err);
    };

    return ThrowObservable;
})(_Observable3['default']);

var EMPTY_THROW = new ThrowObservable(undefined);

function _throw() {
    var err = arguments[0] === undefined ? undefined : arguments[0];

    return err ? new ThrowObservable(err) : EMPTY_THROW;
}

;
module.exports = exports['default'];
//# sourceMappingURL=throw.js.map