'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = subscribeOn;

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _utilSymbol_observer = require('../util/Symbol_observer');

var _utilSymbol_observer2 = _interopRequireDefault(_utilSymbol_observer);

var _SerialSubscription = require('../SerialSubscription');

var _SerialSubscription2 = _interopRequireDefault(_SerialSubscription);

var SubscribeOnObservable = (function (_Observable) {
    function SubscribeOnObservable(source, scheduler) {
        _classCallCheck(this, SubscribeOnObservable);

        _Observable.call(this, null);
        this.source = source;
        this.scheduler = scheduler;
    }

    _inherits(SubscribeOnObservable, _Observable);

    SubscribeOnObservable.prototype[_utilSymbol_observer2['default']] = function (observer) {
        var subscription = new _SerialSubscription2['default'](null);
        var observerFn = _Observable3['default'].prototype[_utilSymbol_observer2['default']]; //HACK: https://github.com/Microsoft/TypeScript/issues/3573
        this.scheduler.schedule(0, [this, observer, observerFn, subscription], dispatchSubscription);
        return subscription;
    };

    return SubscribeOnObservable;
})(_Observable3['default']);

function dispatchSubscription(_ref) {
    var observable = _ref[0];
    var observer = _ref[1];
    var observerFn = _ref[2];
    var subscription = _ref[3];

    subscription.add(observerFn.call(observable, observer));
}

function subscribeOn(scheduler) {
    return new SubscribeOnObservable(this, scheduler);
}

;
module.exports = exports['default'];
//# sourceMappingURL=subscribeOn.js.map