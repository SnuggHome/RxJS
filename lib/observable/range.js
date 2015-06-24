'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = range;

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var RangeObservable = (function (_Observable) {
    function RangeObservable(start, end) {
        _classCallCheck(this, RangeObservable);

        _Observable.call(this, null);
        this.end = end;
        this.start = start;
    }

    _inherits(RangeObservable, _Observable);

    RangeObservable.prototype.subscriber = function subscriber(observer) {
        var end = this.end;
        var start = this.start;
        var i;
        for (i = start; i < end && !observer.unsubscribed; i++) {
            observer.next(i);
        }
        observer['return']();
    };

    return RangeObservable;
})(_Observable3['default']);

function range() {
    var start = arguments[0] === undefined ? 0 : arguments[0];
    var end = arguments[1] === undefined ? 0 : arguments[1];

    return new RangeObservable(Math.min(start, end), Math.max(start, end));
}

;
module.exports = exports['default'];
//# sourceMappingURL=range.js.map