'use strict';

exports.__esModule = true;
exports['default'] = mergeAll;

var _Observer3 = require('../Observer');

var _Observer4 = babelHelpers.interopRequireDefault(_Observer3);

var _Subscription = require('../Subscription');

var _Subscription2 = babelHelpers.interopRequireDefault(_Subscription);

var _SerialSubscription = require('../SerialSubscription');

var _SerialSubscription2 = babelHelpers.interopRequireDefault(_SerialSubscription);

var _CompositeSubscription = require('../CompositeSubscription');

var _CompositeSubscription2 = babelHelpers.interopRequireDefault(_CompositeSubscription);

var _Observable2 = require('../Observable');

var _Observable3 = babelHelpers.interopRequireDefault(_Observable2);

var _utilSymbol_observer = require('../util/Symbol_observer');

var _utilSymbol_observer2 = babelHelpers.interopRequireDefault(_utilSymbol_observer);

var MergeAllObserver = (function (_Observer) {
    function MergeAllObserver(destination, concurrent) {
        babelHelpers.classCallCheck(this, MergeAllObserver);

        _Observer.call(this, destination);
        this.stopped = false;
        this.buffer = [];
        this.concurrent = concurrent;
        this.subscriptions = new _CompositeSubscription2['default']();
    }

    babelHelpers.inherits(MergeAllObserver, _Observer);

    MergeAllObserver.prototype.next = function next(observable) {
        var buffer = this.buffer;
        var concurrent = this.concurrent;
        var subscriptions = this.subscriptions;
        if (subscriptions.length < concurrent) {
            var innerSubscription = new _SerialSubscription2['default'](null);
            var innerObserver = new MergeInnerObserver(this, innerSubscription);
            subscriptions.add(innerSubscription);
            innerSubscription.add(observable[_utilSymbol_observer2['default']](innerObserver));
        } else if (buffer) {
            buffer.push(observable);
        }
        return { done: false };
    };

    MergeAllObserver.prototype['return'] = function _return() {
        this.stopped = true;
        if (this.subscriptions.length === 0 && (this.buffer && this.buffer.length === 0)) {
            this.destination['return']();
        }
        return { done: true };
    };

    MergeAllObserver.prototype._innerReturn = function _innerReturn(innerObserver) {
        var buffer = this.buffer;
        var subscriptions = this.subscriptions;
        subscriptions.remove(innerObserver.subscription);
        if (subscriptions.length < this.concurrent) {
            if (buffer && buffer.length > 0) {
                this.next(buffer.shift());
            } else if (this.stopped && subscriptions.length === 0) {
                return this.destination['return']();
            }
        }
        return { done: true };
    };

    MergeAllObserver.prototype._dispose = function _dispose() {
        console.log('dispose parent');
        this.subscriptions.unsubscribe();
    };

    return MergeAllObserver;
})(_Observer4['default']);

var MergeInnerObserver = (function (_Observer2) {
    function MergeInnerObserver(parent, subscription) {
        babelHelpers.classCallCheck(this, MergeInnerObserver);

        _Observer2.call(this, parent.destination);
        this.parent = parent;
        this.subscription = subscription;
    }

    babelHelpers.inherits(MergeInnerObserver, _Observer2);

    MergeInnerObserver.prototype._return = function _return() {
        return this.parent._innerReturn(this);
    };

    return MergeInnerObserver;
})(_Observer4['default']);

var MergeAllObservable = (function (_Observable) {
    function MergeAllObservable(source, concurrent) {
        babelHelpers.classCallCheck(this, MergeAllObservable);

        _Observable.call(this, null);
        this.source = source;
        this.concurrent = concurrent;
    }

    babelHelpers.inherits(MergeAllObservable, _Observable);

    MergeAllObservable.prototype.subscriber = function subscriber(observer) {
        var mergeAllObserver = new MergeAllObserver(observer, this.concurrent);
        return _Subscription2['default'].from(this.source.subscriber(mergeAllObserver), mergeAllObserver);
    };

    return MergeAllObservable;
})(_Observable3['default']);

function mergeAll() {
    var concurrent = arguments[0] === undefined ? Number.POSITIVE_INFINITY : arguments[0];

    return new MergeAllObservable(this, concurrent);
}

;
module.exports = exports['default'];
//# sourceMappingURL=mergeAll.js.map