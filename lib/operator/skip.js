'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = skip;

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var SkipObserver = (function (_Observer) {
    function SkipObserver(destination, count) {
        _classCallCheck(this, SkipObserver);

        _Observer.call(this, destination);
        this.counter = 0;
        this.count = count;
    }

    _inherits(SkipObserver, _Observer);

    SkipObserver.prototype._next = function _next(value) {
        if (this.counter++ >= this.count) {
            return this.destination.next(value);
        }
        return { done: false };
    };

    return SkipObserver;
})(_Observer3['default']);

var SkipObservable = (function (_Observable) {
    function SkipObservable(source, count) {
        _classCallCheck(this, SkipObservable);

        _Observable.call(this, null);
        this.source = source;
        this.count = count;
    }

    _inherits(SkipObservable, _Observable);

    SkipObservable.prototype.subscriber = function subscriber(observer) {
        var skipObserver = new SkipObserver(observer, this.count);
        return _Subscription2['default'].from(this.source.subscriber(skipObserver), skipObserver);
    };

    return SkipObservable;
})(_Observable3['default']);

function skip(count) {
    return new SkipObservable(this, count);
}

;
module.exports = exports['default'];
//# sourceMappingURL=skip.js.map