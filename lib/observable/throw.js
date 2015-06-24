'use strict';

exports.__esModule = true;
exports['default'] = _throw;

var _Observable2 = require('../Observable');

var _Observable3 = babelHelpers.interopRequireDefault(_Observable2);

var ThrowObservable = (function (_Observable) {
    function ThrowObservable(err) {
        babelHelpers.classCallCheck(this, ThrowObservable);

        _Observable.call(this, null);
        this.err = err;
    }

    babelHelpers.inherits(ThrowObservable, _Observable);

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