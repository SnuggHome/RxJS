'use strict';

exports.__esModule = true;
exports['default'] = take;

var _Observer2 = require('../Observer');

var _Observer3 = babelHelpers.interopRequireDefault(_Observer2);

var _Observable2 = require('../Observable');

var _Observable3 = babelHelpers.interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = babelHelpers.interopRequireDefault(_Subscription);

var TakeObserver = (function (_Observer) {
    function TakeObserver(destination, count) {
        babelHelpers.classCallCheck(this, TakeObserver);

        _Observer.call(this, destination);
        this.counter = 0;
        this.count = count;
    }

    babelHelpers.inherits(TakeObserver, _Observer);

    TakeObserver.prototype._next = function _next(value) {
        if (this.counter++ < this.count) {
            return this.destination.next(value);
        } else {
            return this.destination['return']();
        }
    };

    return TakeObserver;
})(_Observer3['default']);

var TakeObservable = (function (_Observable) {
    function TakeObservable(source, count) {
        babelHelpers.classCallCheck(this, TakeObservable);

        _Observable.call(this, null);
        this.source = source;
        this.count = count;
    }

    babelHelpers.inherits(TakeObservable, _Observable);

    TakeObservable.prototype.subscriber = function subscriber(observer) {
        var takeObserver = new TakeObserver(observer, this.count);
        return _Subscription2['default'].from(this.source.subscriber(takeObserver), takeObserver);
    };

    return TakeObservable;
})(_Observable3['default']);

function take(count) {
    return new TakeObservable(this, count);
}

;
module.exports = exports['default'];
//# sourceMappingURL=take.js.map