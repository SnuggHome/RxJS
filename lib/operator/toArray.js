'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = toArray;

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var ToArrayObserver = (function (_Observer) {
    function ToArrayObserver(destination) {
        _classCallCheck(this, ToArrayObserver);

        _Observer.call(this, destination);
        this.array = [];
    }

    _inherits(ToArrayObserver, _Observer);

    ToArrayObserver.prototype._next = function _next(value) {
        this.array.push(value);
        return { done: false };
    };

    ToArrayObserver.prototype._return = function _return(value) {
        this.destination.next(this.array);
        return this.destination['return'](value);
    };

    return ToArrayObserver;
})(_Observer3['default']);

var ToArrayObservable = (function (_Observable) {
    function ToArrayObservable(source) {
        _classCallCheck(this, ToArrayObservable);

        _Observable.call(this, null);
        this.source = source;
    }

    _inherits(ToArrayObservable, _Observable);

    ToArrayObservable.prototype.subscriber = function subscriber(observer) {
        var toArrayObserver = new ToArrayObserver(observer);
        return _Subscription2['default'].from(this.source.subscriber(toArrayObserver), toArrayObserver);
    };

    return ToArrayObservable;
})(_Observable3['default']);

function toArray() {
    return new ToArrayObservable(this);
}

module.exports = exports['default'];
//# sourceMappingURL=toArray.js.map