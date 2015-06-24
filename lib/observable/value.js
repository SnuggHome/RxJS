'use strict';

exports.__esModule = true;
exports['default'] = value;

var _Observable2 = require('../Observable');

var _Observable3 = babelHelpers.interopRequireDefault(_Observable2);

var ValueObservable = (function (_Observable) {
    function ValueObservable(value) {
        babelHelpers.classCallCheck(this, ValueObservable);

        _Observable.call(this, null);
        this.value = value;
    }

    babelHelpers.inherits(ValueObservable, _Observable);

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