(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilSymbol_observer = require('./util/Symbol_observer');

var _utilSymbol_observer2 = _interopRequireDefault(_utilSymbol_observer);

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _Subject2 = require('./Subject');

var _Subject3 = _interopRequireDefault(_Subject2);

var BehaviorSubject = (function (_Subject) {
    function BehaviorSubject(value) {
        _classCallCheck(this, BehaviorSubject);

        _Subject.call(this);
        this.value = value;
    }

    _inherits(BehaviorSubject, _Subject);

    BehaviorSubject.prototype[_utilSymbol_observer2['default']] = function (observer) {
        this.observers.push(observer);
        var subscription = new _Subscription2['default'](null, observer);
        this.next(this.value);
        return subscription;
    };

    BehaviorSubject.prototype.next = function next(value) {
        this.value = value;
        return _Subject.prototype.next.call(this, value);
    };

    return BehaviorSubject;
})(_Subject3['default']);

exports['default'] = BehaviorSubject;
module.exports = exports['default'];
},{"./Subject":8,"./Subscription":9,"./util/Symbol_observer":47}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Subscription2 = require('./Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var _utilArraySlice = require('./util/arraySlice');

var _utilArraySlice2 = _interopRequireDefault(_utilArraySlice);

var CompositeSubscription = (function (_Subscription) {
    function CompositeSubscription() {
        _classCallCheck(this, CompositeSubscription);

        _Subscription.call(this, null, null);
        this.length = 0;
    }

    _inherits(CompositeSubscription, _Subscription);

    CompositeSubscription.from = function from(subscriptions) {
        var comp = new CompositeSubscription();
        if (Array.isArray(subscriptions)) {
            subscriptions.forEach(function (sub) {
                return comp.add(sub);
            });
        }
        return comp;
    };

    CompositeSubscription.prototype.unsubscribe = function unsubscribe() {
        if (this.unsubscribed || !this._subscriptions) {
            return;
        }
        this.unsubscribed = true;
        var subscriptions = _utilArraySlice2['default'](this._subscriptions);
        var subscriptionCount = subscriptions && subscriptions.length || 0;
        var subscriptionIndex = -1;
        this._subscriptions = undefined;
        while (++subscriptionIndex < subscriptionCount) {
            subscriptions[subscriptionIndex].unsubscribe();
        }
    };

    CompositeSubscription.prototype.add = function add(subscription) {
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        if (subscription && !subscription.unsubscribed) {
            if (this.unsubscribed) {
                subscription.unsubscribe();
            } else {
                subscriptions.push(subscription);
            }
        }
        this.length = subscriptions.length;
        return this;
    };

    CompositeSubscription.prototype.remove = function remove(subscription) {
        var unsubscribed = this.unsubscribed;
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
            this.length = subscriptions.length;
        } else {
            this.length = 0;
        }
        return this;
    };

    CompositeSubscription.prototype.indexOf = function indexOf(subscription) {
        return this._subscriptions.indexOf(subscription);
    };

    return CompositeSubscription;
})(_Subscription3['default']);

exports['default'] = CompositeSubscription;
module.exports = exports['default'];
},{"./Subscription":9,"./util/arraySlice":48}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observable3 = require('./Observable');

var _Observable4 = _interopRequireDefault(_Observable3);

var _Observer = require('./Observer');

var _Observer2 = _interopRequireDefault(_Observer);

var _utilSymbol_observer = require('./util/Symbol_observer');

var _utilSymbol_observer2 = _interopRequireDefault(_utilSymbol_observer);

var _schedulerNextTick = require('./scheduler/nextTick');

var _schedulerNextTick2 = _interopRequireDefault(_schedulerNextTick);

var ConnectableObservable = (function (_Observable) {
    function ConnectableObservable(source, subjectFactory) {
        _classCallCheck(this, ConnectableObservable);

        _Observable.call(this, null);
        this.source = source;
        this.subjectFactory = subjectFactory;
    }

    _inherits(ConnectableObservable, _Observable);

    ConnectableObservable.prototype.connect = function connect() {
        return _schedulerNextTick2['default'].schedule(0, this, dispatchConnection);
    };

    ConnectableObservable.prototype.connectSync = function connectSync() {
        return dispatchConnection(this);
    };

    ConnectableObservable.prototype[_utilSymbol_observer2['default']] = function (observer) {
        if (!(observer instanceof _Observer2['default'])) {
            observer = new _Observer2['default'](observer);
        }
        if (!this.subject || this.subject.unsubscribed) {
            if (this.subscription) {
                this.subscription = undefined;
            }
            this.subject = this.subjectFactory();
        }
        return this.subject[_utilSymbol_observer2['default']](observer);
    };

    ConnectableObservable.prototype.refCount = function refCount() {
        return new RefCountObservable(this);
    };

    return ConnectableObservable;
})(_Observable4['default']);

exports['default'] = ConnectableObservable;

var RefCountObservable = (function (_Observable2) {
    function RefCountObservable(source) {
        _classCallCheck(this, RefCountObservable);

        _Observable2.call(this, null);
        this.refCount = 0;
        this.source = source;
    }

    _inherits(RefCountObservable, _Observable2);

    RefCountObservable.prototype.subscriber = function subscriber(observer) {
        var _this = this;

        this.refCount++;
        this.source[_utilSymbol_observer2['default']](observer);
        var shouldConnect = this.refCount === 1;
        if (shouldConnect) {
            this.connectionSubscription = this.source.connectSync();
        }
        return function () {
            var refCount = _this.refCount--;
            if (refCount === 0) {
                _this.connectionSubscription.unsubscribe();
            }
        };
    };

    return RefCountObservable;
})(_Observable4['default']);

function dispatchConnection(connectable) {
    if (!connectable.subscription) {
        if (!connectable.subject) {
            connectable.subject = connectable.subjectFactory();
        }
        connectable.subscription = connectable.source.subscribe(connectable.subject);
    }
    return connectable.subscription;
}
module.exports = exports['default'];
},{"./Observable":4,"./Observer":5,"./scheduler/nextTick":45,"./util/Symbol_observer":47}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Observer = require('./Observer');

var _Observer2 = _interopRequireDefault(_Observer);

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _SerialSubscription = require('./SerialSubscription');

var _SerialSubscription2 = _interopRequireDefault(_SerialSubscription);

var _schedulerNextTick = require('./scheduler/nextTick');

var _schedulerNextTick2 = _interopRequireDefault(_schedulerNextTick);

var _utilSymbol_observer = require('./util/Symbol_observer');

var _utilSymbol_observer2 = _interopRequireDefault(_utilSymbol_observer);

var Observable = (function () {
    function Observable(subscriber) {
        _classCallCheck(this, Observable);

        if (subscriber) {
            this.subscriber = subscriber;
        }
    }

    Observable.create = function create(subscriber) {
        return new Observable(subscriber);
    };

    Observable.prototype.subscriber = function subscriber(observer) {
        return void 0;
    };

    Observable.prototype[_utilSymbol_observer2['default']] = function (observer) {
        if (!(observer instanceof _Observer2['default'])) {
            observer = new _Observer2['default'](observer);
        }
        return _Subscription2['default'].from(this.subscriber(observer), observer);
    };

    Observable.prototype.subscribe = function subscribe(observerOrNextHandler) {
        var throwHandler = arguments[1] === undefined ? null : arguments[1];
        var returnHandler = arguments[2] === undefined ? null : arguments[2];
        var disposeHandler = arguments[3] === undefined ? null : arguments[3];

        var observer;
        if (typeof observerOrNextHandler === 'object') {
            observer = observerOrNextHandler;
        } else {
            observer = _Observer2['default'].create(observerOrNextHandler, throwHandler, returnHandler, disposeHandler);
        }
        var subscription = new _SerialSubscription2['default'](null);
        subscription.observer = observer;
        subscription.add(_schedulerNextTick2['default'].schedule(0, [observer, this], dispatchSubscription));
        return subscription;
    };

    Observable.prototype.forEach = function forEach(nextHandler) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            var observer = _Observer2['default'].create(function (value) {
                nextHandler(value);
                return { done: false };
            }, function (err) {
                reject(err);
                return { done: true };
            }, function (value) {
                resolve(value);
                return { done: true };
            });
            _this[_utilSymbol_observer2['default']](observer);
        });
    };

    return Observable;
})();

exports['default'] = Observable;

function dispatchSubscription(_ref) {
    var observer = _ref[0];
    var observable = _ref[1];

    return observable[_utilSymbol_observer2['default']](observer);
}
module.exports = exports['default'];
},{"./Observer":5,"./SerialSubscription":7,"./Subscription":9,"./scheduler/nextTick":45,"./util/Symbol_observer":47}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = (function () {
    function Observer(destination) {
        _classCallCheck(this, Observer);

        this.unsubscribed = false;
        this.destination = destination;
    }

    Observer.create = function create(_next) {
        var _throw = arguments[1] === undefined ? null : arguments[1];

        var _return = arguments[2] === undefined ? null : arguments[2];

        var _dispose = arguments[3] === undefined ? null : arguments[3];

        var observer = new Observer(null);
        observer._next = _next;
        if (_throw) {
            observer._throw = _throw;
        }
        if (_return) {
            observer._return = _return;
        }
        if (_dispose) {
            observer._dispose = _dispose;
        }
        return observer;
    };

    Observer.prototype._dispose = function _dispose() {
        var destination = this.destination;
        if (destination && destination.dispose) {
            destination.dispose();
        }
    };

    Observer.prototype._next = function _next(value) {
        return this.destination.next(value);
    };

    Observer.prototype._throw = function _throw(error) {
        var destination = this.destination;
        if (destination && destination["throw"]) {
            return destination["throw"](error);
        } else {
            throw error;
        }
    };

    Observer.prototype._return = function _return(value) {
        var destination = this.destination;
        if (destination && destination["return"]) {
            return destination["return"](value);
        } else {
            return { done: true };
        }
    };

    Observer.prototype.next = function next(value) {
        if (this.unsubscribed) {
            return { done: true };
        }
        var result = this._next(value);
        result = result || { done: false };
        if (result.done) {
            this.unsubscribe();
        }
        return result;
    };

    Observer.prototype["throw"] = function _throw(error) {
        if (this.unsubscribed) {
            return { done: true };
        }
        var result = this._throw(error);
        this.unsubscribe();
        return { done: true, value: result ? result.value : undefined };
    };

    Observer.prototype["return"] = function _return() {
        var value = arguments[0] === undefined ? undefined : arguments[0];

        if (this.unsubscribed) {
            return { done: true };
        }
        var result = this._return(value);
        this.unsubscribe();
        return { done: true, value: result ? result.value : undefined };
    };

    Observer.prototype.unsubscribe = function unsubscribe() {
        this.unsubscribed = true;
        if (this.subscription && this.subscription._unsubscribe) {
            this.subscription._unsubscribe();
        }
    };

    Observer.prototype.setSubscription = function setSubscription(subscription) {
        this.subscription = subscription;
        if (this.unsubscribed && subscription._unsubscribe) {
            subscription._unsubscribe();
        }
    };

    Observer.prototype.dispose = function dispose() {
        if (!this.unsubscribed) {
            if (this._dispose) {
                this._dispose();
            }
        }
        this.unsubscribe();
    };

    return Observer;
})();

exports["default"] = Observer;
module.exports = exports["default"];
},{}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('./Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var _Observer = require('./Observer');

var _Observer2 = _interopRequireDefault(_Observer);

var _schedulerNextTick = require('./scheduler/nextTick');

var _schedulerNextTick2 = _interopRequireDefault(_schedulerNextTick);

var _schedulerImmediate = require('./scheduler/immediate');

var _schedulerImmediate2 = _interopRequireDefault(_schedulerImmediate);

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _CompositeSubscription = require('./CompositeSubscription');

var _CompositeSubscription2 = _interopRequireDefault(_CompositeSubscription);

var _SerialSubscription = require('./SerialSubscription');

var _SerialSubscription2 = _interopRequireDefault(_SerialSubscription);

var _Subject = require('./Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _BehaviorSubject = require('./BehaviorSubject');

var _BehaviorSubject2 = _interopRequireDefault(_BehaviorSubject);

var _ConnectableObservable = require('./ConnectableObservable');

var _ConnectableObservable2 = _interopRequireDefault(_ConnectableObservable);

var _observableValue = require('./observable/value');

var _observableValue2 = _interopRequireDefault(_observableValue);

var _observableReturn = require('./observable/return');

var _observableReturn2 = _interopRequireDefault(_observableReturn);

var _observableFromEventPattern = require('./observable/fromEventPattern');

var _observableFromEventPattern2 = _interopRequireDefault(_observableFromEventPattern);

var _observableFromEvent = require('./observable/fromEvent');

var _observableFromEvent2 = _interopRequireDefault(_observableFromEvent);

var _observableThrow = require('./observable/throw');

var _observableThrow2 = _interopRequireDefault(_observableThrow);

var _observableEmpty = require('./observable/empty');

var _observableEmpty2 = _interopRequireDefault(_observableEmpty);

var _observableRange = require('./observable/range');

var _observableRange2 = _interopRequireDefault(_observableRange);

var _observableFromArray = require('./observable/fromArray');

var _observableFromArray2 = _interopRequireDefault(_observableFromArray);

var _observableZip = require('./observable/zip');

var _observableZip2 = _interopRequireDefault(_observableZip);

var _observableFromPromise = require('./observable/fromPromise');

var _observableFromPromise2 = _interopRequireDefault(_observableFromPromise);

var _observableOf = require('./observable/of');

var _observableOf2 = _interopRequireDefault(_observableOf);

var _observableTimer = require('./observable/timer');

var _observableTimer2 = _interopRequireDefault(_observableTimer);

var _observableInterval = require('./observable/interval');

var _observableInterval2 = _interopRequireDefault(_observableInterval);

var _operatorFilter = require('./operator/filter');

var _operatorFilter2 = _interopRequireDefault(_operatorFilter);

var _operatorMap = require('./operator/map');

var _operatorMap2 = _interopRequireDefault(_operatorMap);

var _operatorMapTo = require('./operator/mapTo');

var _operatorMapTo2 = _interopRequireDefault(_operatorMapTo);

var _operatorMergeAll = require('./operator/mergeAll');

var _operatorMergeAll2 = _interopRequireDefault(_operatorMergeAll);

var _operatorFlatMap = require('./operator/flatMap');

var _operatorFlatMap2 = _interopRequireDefault(_operatorFlatMap);

var _operatorConcatAll = require('./operator/concatAll');

var _operatorConcatAll2 = _interopRequireDefault(_operatorConcatAll);

var _operatorSkip = require('./operator/skip');

var _operatorSkip2 = _interopRequireDefault(_operatorSkip);

var _operatorTake = require('./operator/take');

var _operatorTake2 = _interopRequireDefault(_operatorTake);

var _operatorSubscribeOn = require('./operator/subscribeOn');

var _operatorSubscribeOn2 = _interopRequireDefault(_operatorSubscribeOn);

var _operatorObserveOn = require('./operator/observeOn');

var _operatorObserveOn2 = _interopRequireDefault(_operatorObserveOn);

var _operatorZipAll = require('./operator/zipAll');

var _operatorZipAll2 = _interopRequireDefault(_operatorZipAll);

var _operatorZip = require('./operator/zip');

var _operatorZip2 = _interopRequireDefault(_operatorZip);

var _operatorMerge = require('./operator/merge');

var _operatorMerge2 = _interopRequireDefault(_operatorMerge);

var _operatorToArray = require('./operator/toArray');

var _operatorToArray2 = _interopRequireDefault(_operatorToArray);

var _operatorMulticast = require('./operator/multicast');

var _operatorMulticast2 = _interopRequireDefault(_operatorMulticast);

var _operatorPublish = require('./operator/publish');

var _operatorPublish2 = _interopRequireDefault(_operatorPublish);

var _operatorReduce = require('./operator/reduce');

var _operatorReduce2 = _interopRequireDefault(_operatorReduce);

_Observable2['default'].value = _observableValue2['default'];
_Observable2['default']['return'] = _observableReturn2['default'];
_Observable2['default'].fromEventPattern = _observableFromEventPattern2['default'];
_Observable2['default'].fromEvent = _observableFromEvent2['default'];
_Observable2['default']['throw'] = _observableThrow2['default'];
_Observable2['default'].empty = _observableEmpty2['default'];
_Observable2['default'].range = _observableRange2['default'];
_Observable2['default'].fromArray = _observableFromArray2['default'];
_Observable2['default'].zip = _observableZip2['default'];
_Observable2['default'].fromPromise = _observableFromPromise2['default'];
_Observable2['default'].of = _observableOf2['default'];
_Observable2['default'].timer = _observableTimer2['default'];
_Observable2['default'].interval = _observableInterval2['default'];
_Observable2['default'].prototype.filter = _operatorFilter2['default'];
_Observable2['default'].prototype.map = _operatorMap2['default'];
_Observable2['default'].prototype.mapTo = _operatorMapTo2['default'];
_Observable2['default'].prototype.mergeAll = _operatorMergeAll2['default'];
_Observable2['default'].prototype.flatMap = _operatorFlatMap2['default'];
_Observable2['default'].prototype.concatAll = _operatorConcatAll2['default'];
_Observable2['default'].prototype.skip = _operatorSkip2['default'];
_Observable2['default'].prototype.take = _operatorTake2['default'];
_Observable2['default'].prototype.subscribeOn = _operatorSubscribeOn2['default'];
_Observable2['default'].prototype.observeOn = _operatorObserveOn2['default'];
_Observable2['default'].prototype.zipAll = _operatorZipAll2['default'];
_Observable2['default'].prototype.zip = _operatorZip2['default'];
_Observable2['default'].prototype.merge = _operatorMerge2['default'];
_Observable2['default'].prototype.toArray = _operatorToArray2['default'];
_Observable2['default'].prototype.multicast = _operatorMulticast2['default'];
_Observable2['default'].prototype.publish = _operatorPublish2['default'];
_Observable2['default'].prototype.reduce = _operatorReduce2['default'];
var RxNext = {
    Scheduler: {
        nextTick: _schedulerNextTick2['default'],
        immediate: _schedulerImmediate2['default']
    },
    Observer: _Observer2['default'],
    Observable: _Observable2['default'],
    Subscription: _Subscription2['default'],
    CompositeSubscription: _CompositeSubscription2['default'],
    SerialSubscription: _SerialSubscription2['default'],
    Subject: _Subject2['default'],
    BehaviorSubject: _BehaviorSubject2['default'],
    ConnectableObservable: _ConnectableObservable2['default']
};
exports['default'] = RxNext;
module.exports = exports['default'];
},{"./BehaviorSubject":1,"./CompositeSubscription":2,"./ConnectableObservable":3,"./Observable":4,"./Observer":5,"./SerialSubscription":7,"./Subject":8,"./Subscription":9,"./observable/empty":11,"./observable/fromArray":12,"./observable/fromEvent":13,"./observable/fromEventPattern":14,"./observable/fromPromise":15,"./observable/interval":16,"./observable/of":17,"./observable/range":18,"./observable/return":19,"./observable/throw":20,"./observable/timer":21,"./observable/value":22,"./observable/zip":23,"./operator/concatAll":24,"./operator/filter":25,"./operator/flatMap":26,"./operator/map":27,"./operator/mapTo":28,"./operator/merge":29,"./operator/mergeAll":30,"./operator/multicast":31,"./operator/observeOn":32,"./operator/publish":33,"./operator/reduce":34,"./operator/skip":35,"./operator/subscribeOn":36,"./operator/take":37,"./operator/toArray":38,"./operator/zip":39,"./operator/zipAll":40,"./scheduler/immediate":44,"./scheduler/nextTick":45}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Subscription2 = require('./Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var SerialSubscription = (function (_Subscription) {
    function SerialSubscription(subscription) {
        _classCallCheck(this, SerialSubscription);

        _Subscription.call(this, null, null);
        this.subscription = subscription;
    }

    _inherits(SerialSubscription, _Subscription);

    SerialSubscription.prototype.add = function add(subscription) {
        if (subscription) {
            if (this.unsubscribed) {
                subscription.unsubscribe();
            } else {
                var currentSubscription = this.subscription;
                this.subscription = subscription;
                if (currentSubscription) {
                    currentSubscription.unsubscribe();
                }
            }
        }
        return this;
    };

    SerialSubscription.prototype.remove = function remove(subscription) {
        if (this.subscription === subscription) {
            this.subscription = undefined;
        }
        return this;
    };

    SerialSubscription.prototype.unsubscribe = function unsubscribe() {
        _Subscription.prototype.unsubscribe.call(this);
        if (this.unsubscribed) {
            return;
        }
        this.unsubscribed = true;
        var subscription = this.subscription;
        if (subscription) {
            this.subscription = undefined;
            subscription.unsubscribe();
        }
    };

    return SerialSubscription;
})(_Subscription3['default']);

exports['default'] = SerialSubscription;
module.exports = exports['default'];
},{"./Subscription":9}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observable2 = require('./Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _utilSymbol_observer = require('./util/Symbol_observer');

var _utilSymbol_observer2 = _interopRequireDefault(_utilSymbol_observer);

var _Subscription2 = require('./Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var Subject = (function (_Observable) {
    function Subject() {
        _classCallCheck(this, Subject);

        _Observable.call(this, null);
        this.disposed = false;
        this.observers = [];
        this.unsubscribed = false;
    }

    _inherits(Subject, _Observable);

    Subject.prototype.dispose = function dispose() {
        this.disposed = true;
        if (this._dispose) {
            this._dispose();
        }
    };

    Subject.prototype[_utilSymbol_observer2['default']] = function (observer) {
        this.observers.push(observer);
        var subscription = new _Subscription3['default'](null, observer);
        return subscription;
    };

    Subject.prototype.next = function next(value) {
        if (this.unsubscribed) {
            return { done: true };
        }
        this.observers.forEach(function (o) {
            return o.next(value);
        });
        this._cleanUnsubbedObservers();
        return { done: false };
    };

    Subject.prototype['throw'] = function _throw(err) {
        if (this.unsubscribed) {
            return { done: true };
        }
        this.observers.forEach(function (o) {
            return o['throw'](err);
        });
        this.unsubscribe();
        this._cleanUnsubbedObservers();
        return { done: true };
    };

    Subject.prototype['return'] = function _return(value) {
        if (this.unsubscribed) {
            return { done: true };
        }
        this.observers.forEach(function (o) {
            return o['return'](value);
        });
        this.unsubscribe();
        this._cleanUnsubbedObservers();
        return { done: true };
    };

    Subject.prototype._cleanUnsubbedObservers = function _cleanUnsubbedObservers() {
        var i;
        var observers = this.observers;
        for (i = observers.length; i--;) {
            if (observers[i].unsubscribed) {
                observers.splice(i, 1);
            }
        }
        if (observers.length === 0) {
            this.unsubscribe();
        }
    };

    Subject.prototype.unsubscribe = function unsubscribe() {
        this.observers.length = 0;
        this.unsubscribed = true;
    };

    return Subject;
})(_Observable3['default']);

exports['default'] = Subject;

var SubjectSubscription = (function (_Subscription) {
    function SubjectSubscription(observer, subject) {
        _classCallCheck(this, SubjectSubscription);

        _Subscription.call(this, null, observer);
        this.subject = subject;
    }

    _inherits(SubjectSubscription, _Subscription);

    SubjectSubscription.prototype.unsubscribe = function unsubscribe() {
        var observers = this.subject.observers;
        var index = observers.indexOf(this.observer);
        if (index !== -1) {
            observers.splice(index, 1);
        }
        _Subscription.prototype.unsubscribe.call(this);
    };

    return SubjectSubscription;
})(_Subscription3['default']);

module.exports = exports['default'];
},{"./Observable":4,"./Subscription":9,"./util/Symbol_observer":47}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Subscription = (function () {
    function Subscription(_unsubscribe, observer) {
        _classCallCheck(this, Subscription);

        this.length = 0;
        this.unsubscribed = false;
        this._unsubscribe = _unsubscribe;
        this.observer = observer;
        if (observer) {
            observer.setSubscription(this);
        }
    }

    Subscription.prototype.unsubscribe = function unsubscribe() {
        if (this.unsubscribed) {
            return;
        }
        this.unsubscribed = true;
        var unsubscribe = this._unsubscribe;
        if (unsubscribe) {
            this._unsubscribe = undefined;
            unsubscribe.call(this);
        }
        var observer = this.observer;
        if (observer) {
            this.observer = undefined;
            if (observer.dispose && observer._dispose) {
                observer.dispose();
            } else if (observer['return'] && observer._return) {
                observer['return']();
            }
        }
    };

    Subscription.prototype.add = function add(subscription) {
        return this;
    };

    Subscription.prototype.remove = function remove(subscription) {
        return this;
    };

    Subscription.from = function from(value, observer) {
        if (!value) {
            return new Subscription(undefined, observer);
        } else if (value && typeof value.unsubscribe === 'function') {
            return value;
        } else if (typeof value === 'function') {
            return new Subscription(value, observer);
        }
    };

    return Subscription;
})();

exports['default'] = Subscription;
module.exports = exports['default'];
},{}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var ArrayObservable = (function (_Observable) {
    function ArrayObservable(array) {
        _classCallCheck(this, ArrayObservable);

        _Observable.call(this, null);
        this.array = array;
    }

    _inherits(ArrayObservable, _Observable);

    ArrayObservable.prototype.subscriber = function subscriber(observer) {
        var i, len;
        var array = this.array;
        if (Array.isArray(array)) {
            for (i = 0, len = array.length; i < len && !observer.unsubscribed; i++) {
                observer.next(array[i]);
            }
        }
        observer['return']();
    };

    return ArrayObservable;
})(_Observable3['default']);

exports['default'] = ArrayObservable;
module.exports = exports['default'];
},{"../Observable":4}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = empty;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var EMPTY = new _Observable2['default'](function (observer) {
    observer['return']();
});

function empty() {
    return EMPTY;
}

;
module.exports = exports['default'];
},{"../Observable":4}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = fromArray;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ArrayObservable = require('./ArrayObservable');

var _ArrayObservable2 = _interopRequireDefault(_ArrayObservable);

function fromArray(array) {
    return new _ArrayObservable2['default'](array);
}

module.exports = exports['default'];
},{"./ArrayObservable":10}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

/**
 * Creates an observable sequence by adding an event listener to the matching DOMElement or each item in the NodeList.
 *
 * @example
 *   var source = Rx.Observable.fromEvent(element, 'mouseup');
 *
 * @param {any} element The DOMElement or NodeList to attach a listener.
 * @param {string} eventName The event name to attach the observable sequence.
 * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
 * @returns {Observable} An observable sequence of events from the specified element and the specified event.
 */
exports['default'] = fromEvent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilErrorObject2 = _interopRequireDefault(_utilErrorObject);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _CompositeSubscription = require('../CompositeSubscription');

var _CompositeSubscription2 = _interopRequireDefault(_CompositeSubscription);

var _fromEventPattern = require('./fromEventPattern');

var _fromEventPattern2 = _interopRequireDefault(_fromEventPattern);

var EventListenerObservable = (function (_Observable) {
    function EventListenerObservable(element, eventName, selector) {
        _classCallCheck(this, EventListenerObservable);

        _Observable.call(this, null);
        this.element = element;
        this.eventName = eventName;
        this.selector = selector;
    }

    _inherits(EventListenerObservable, _Observable);

    EventListenerObservable.prototype.subscriber = function subscriber(observer) {
        var selector = this.selector;
        var listeners = createEventListener(this.element, this.eventName, function handler(e) {
            var result = e;
            var iteratorResult;
            if (selector) {
                result = _utilTryCatch2['default'](selector).apply(this, arguments);
                if (result === _utilErrorObject2['default']) {
                    observer['throw'](_utilErrorObject2['default'].e);
                    listeners.unsubscribe();
                    return;
                }
            }
            iteratorResult = observer.next(result);
            if (iteratorResult.done) {
                listeners.unsubscribe();
            }
        }, observer);
        return listeners;
    };

    return EventListenerObservable;
})(_Observable3['default']);

function createListener(element, name, handler, observer) {
    if (element.addEventListener) {
        element.addEventListener(name, handler, false);
        return new _Subscription2['default'](function () {
            element.removeEventListener(name, handler, false);
        }, observer);
    }
    throw new Error('No listener found.');
}
function createEventListener(element, eventName, handler, observer) {
    var subscriptions = new _CompositeSubscription2['default']();
    // Asume NodeList
    if (Object.prototype.toString.call(element) === '[object NodeList]') {
        for (var i = 0, len = element.length; i < len; i++) {
            subscriptions.add(createEventListener(element.item(i), eventName, handler, observer));
        }
    } else if (element) {
        subscriptions.add(createListener(element, eventName, handler, observer));
    }
    return subscriptions;
}
function fromEvent(element, eventName) {
    var selector = arguments[2] === undefined ? null : arguments[2];

    // Node.js specific
    if (element.addListener) {
        return _fromEventPattern2['default'](function (h) {
            element.addListener(eventName, h);
        }, function (h) {
            element.removeListener(eventName, h);
        }, selector);
    }
    var config = this.config || {};
    // Use only if non-native events are allowed
    if (!config.useNativeEvents) {
        // Handles jq, Angular.js, Zepto, Marionette, Ember.js
        if (typeof element.on === 'function' && typeof element.off === 'function') {
            return _fromEventPattern2['default'](function (h) {
                element.on(eventName, h);
            }, function (h) {
                element.off(eventName, h);
            }, selector);
        }
    }
    return new EventListenerObservable(element, eventName, selector);
}

;
module.exports = exports['default'];
},{"../CompositeSubscription":2,"../Observable":4,"../Subscription":9,"../util/errorObject":49,"../util/tryCatch":51,"./fromEventPattern":14}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

/**
 * Creates an observable sequence from an event emitter via an addHandler/removeHandler pair.
 * @param {Function} addHandler The function to add a handler to the emitter.
 * @param {Function} [removeHandler] The optional function to remove a handler from an emitter.
 * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
 * @returns {Observable} An observable sequence which wraps an event from an event emitter
 */
exports['default'] = fromEventPattern;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilErrorObject2 = _interopRequireDefault(_utilErrorObject);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var FromEventPatternObservable = (function (_Observable) {
    function FromEventPatternObservable(add, remove, selector) {
        _classCallCheck(this, FromEventPatternObservable);

        _Observable.call(this, null);
        this.add = add;
        this.remove = remove;
        this.selector = selector;
    }

    _inherits(FromEventPatternObservable, _Observable);

    FromEventPatternObservable.prototype.subscriber = function subscriber(_subscriber) {
        var unsubscribe = function unsubscribe() {
            if (remove) {
                remove(innerHandler, token);
            }
        };
        function innerHandler(e) {
            var result = e;
            if (selector) {
                result = _utilTryCatch2['default'](selector).apply(this, arguments);
                if (result === _utilErrorObject2['default']) {
                    _subscriber['throw'](_utilErrorObject2['default'].e);
                    unsubscribe();
                    return;
                }
            }
            result = _subscriber.next(result);
            if (result.done) {
                unsubscribe();
            }
        }
        var self = this;
        var remove = this.remove;
        var selector = this.selector;
        var token = this.add(innerHandler);
        return unsubscribe;
    };

    return FromEventPatternObservable;
})(_Observable3['default']);

function fromEventPattern(addHandler) {
    var removeHandler = arguments[1] === undefined ? null : arguments[1];
    var selector = arguments[2] === undefined ? null : arguments[2];

    return new FromEventPatternObservable(addHandler, removeHandler, selector);
}

;
module.exports = exports['default'];
},{"../Observable":4,"../util/errorObject":49,"../util/tryCatch":51}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = fromPromise;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var PromiseObservable = (function (_Observable) {
    function PromiseObservable(promise) {
        _classCallCheck(this, PromiseObservable);

        _Observable.call(this, null);
        this.promise = promise;
    }

    _inherits(PromiseObservable, _Observable);

    PromiseObservable.prototype.subscriber = function subscriber(observer) {
        var promise = this.promise;
        if (promise) {
            promise.then(function (x) {
                if (!observer.unsubscribed) {
                    observer.next(x);
                    observer['return'](x);
                }
            });
        }
    };

    return PromiseObservable;
})(_Observable3['default']);

function fromPromise(promise) {
    return new PromiseObservable(promise);
}

module.exports = exports['default'];
},{"../Observable":4}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = timer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _schedulerNextTick = require('../scheduler/nextTick');

var _schedulerNextTick2 = _interopRequireDefault(_schedulerNextTick);

var IntervalObservable = (function (_Observable) {
    function IntervalObservable(interval, scheduler) {
        _classCallCheck(this, IntervalObservable);

        _Observable.call(this, null);
        this.interval = interval;
        this.scheduler = scheduler;
    }

    _inherits(IntervalObservable, _Observable);

    IntervalObservable.prototype.subscriber = function subscriber(observer) {
        this.scheduler.schedule(this.interval, new IntervalObserver(observer, this.interval, this.scheduler), dispatch);
    };

    return IntervalObservable;
})(_Observable3['default']);

var IntervalObserver = (function (_Observer) {
    function IntervalObserver(destination, interval, scheduler) {
        _classCallCheck(this, IntervalObserver);

        _Observer.call(this, destination);
        this.counter = 0;
        this.interval = interval;
        this.scheduler = scheduler;
    }

    _inherits(IntervalObserver, _Observer);

    IntervalObserver.prototype.emitNext = function emitNext() {
        if (!this.unsubscribed) {
            this.next(this.counter++);
            this.scheduler.schedule(this.interval, this, dispatch);
        }
    };

    return IntervalObserver;
})(_Observer3['default']);

function dispatch(observer) {
    observer.emitNext();
}

function timer() {
    var interval = arguments[0] === undefined ? 0 : arguments[0];
    var scheduler = arguments[1] === undefined ? _schedulerNextTick2['default'] : arguments[1];

    return new IntervalObservable(interval, scheduler);
}

;
module.exports = exports['default'];
},{"../Observable":4,"../Observer":5,"../scheduler/nextTick":45}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = of;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ArrayObservable = require('./ArrayObservable');

var _ArrayObservable2 = _interopRequireDefault(_ArrayObservable);

function of() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
    }

    return new _ArrayObservable2['default'](values);
}

;
module.exports = exports['default'];
},{"./ArrayObservable":10}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = range;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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
},{"../Observable":4}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = _return;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var ReturnObservable = (function (_Observable) {
    function ReturnObservable(returnValue) {
        _classCallCheck(this, ReturnObservable);

        _Observable.call(this, null);
        this.returnValue = returnValue;
    }

    _inherits(ReturnObservable, _Observable);

    ReturnObservable.prototype.subscriber = function subscriber(observer) {
        observer['return'](this.returnValue);
    };

    return ReturnObservable;
})(_Observable3['default']);

function _return() {
    var returnValue = arguments[0] === undefined ? undefined : arguments[0];

    return new ReturnObservable(returnValue);
}

module.exports = exports['default'];
},{"../Observable":4}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = _throw;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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
},{"../Observable":4}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = timer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _schedulerNextTick = require('../scheduler/nextTick');

var _schedulerNextTick2 = _interopRequireDefault(_schedulerNextTick);

var TimerObservable = (function (_Observable) {
    function TimerObservable(delay, scheduler) {
        _classCallCheck(this, TimerObservable);

        _Observable.call(this, null);
        this.delay = delay;
        this.scheduler = scheduler;
    }

    _inherits(TimerObservable, _Observable);

    TimerObservable.prototype.subscriber = function subscriber(observer) {
        this.scheduler.schedule(this.delay, observer, dispatch);
    };

    return TimerObservable;
})(_Observable3['default']);

function dispatch(observer) {
    if (!observer.unsubscribed) {
        observer.next(0);
        observer['return']();
    }
}

function timer() {
    var delay = arguments[0] === undefined ? 0 : arguments[0];
    var scheduler = arguments[1] === undefined ? _schedulerNextTick2['default'] : arguments[1];

    return new TimerObservable(delay, scheduler);
}

;
module.exports = exports['default'];
},{"../Observable":4,"../scheduler/nextTick":45}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = value;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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
},{"../Observable":4}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = zip;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _CompositeSubscription = require('../CompositeSubscription');

var _CompositeSubscription2 = _interopRequireDefault(_CompositeSubscription);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _utilSymbol_observer = require('../util/Symbol_observer');

var _utilSymbol_observer2 = _interopRequireDefault(_utilSymbol_observer);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilErrorObject2 = _interopRequireDefault(_utilErrorObject);

var ZipObservable = (function (_Observable) {
    function ZipObservable(observables, project) {
        _classCallCheck(this, ZipObservable);

        _Observable.call(this, null);
        this.observables = observables;
        this.project = project;
    }

    _inherits(ZipObservable, _Observable);

    ZipObservable.prototype.subscriber = function subscriber(observer) {
        var _this = this;

        var subscriptions = new _CompositeSubscription2['default']();
        this.observables.forEach(function (obs, i) {
            var innerObserver = new InnerZipObserver(observer, i, _this.project, subscriptions, obs);
            subscriptions.add(_Subscription2['default'].from(obs[_utilSymbol_observer2['default']](innerObserver), innerObserver));
        });
        return subscriptions;
    };

    return ZipObservable;
})(_Observable3['default']);

var InnerZipObserver = (function (_Observer) {
    function InnerZipObserver(destination, index, project, subscriptions, observable) {
        _classCallCheck(this, InnerZipObserver);

        _Observer.call(this, destination);
        this.buffer = [];
        this.index = index;
        this.project = project;
        this.subscriptions = subscriptions;
        this.observable = observable;
    }

    _inherits(InnerZipObserver, _Observer);

    InnerZipObserver.prototype._next = function _next(value) {
        this.buffer.push(value);
        return { done: false };
    };

    InnerZipObserver.prototype._canEmit = function _canEmit() {
        return this.subscriptions._subscriptions.every(function (sub) {
            var observer = sub.observer;
            return !observer.unsubscribed && observer.buffer.length > 0;
        });
    };

    InnerZipObserver.prototype._getArgs = function _getArgs() {
        return this.subscriptions._subscriptions.reduce(function (args, sub) {
            var observer = sub.observer;
            args.push(observer.buffer.shift());
            return args;
        }, []);
    };

    InnerZipObserver.prototype._checkNext = function _checkNext() {
        if (this._canEmit()) {
            var args = this._getArgs();
            return this._sendNext(args);
        }
    };

    InnerZipObserver.prototype._sendNext = function _sendNext(args) {
        var value = _utilTryCatch2['default'](this.project).apply(this, args);
        if (value === _utilErrorObject2['default']) {
            return this.destination['throw'](_utilErrorObject2['default'].e);
        } else {
            return this.destination.next(value);
        }
    };

    return InnerZipObserver;
})(_Observer3['default']);

function zip(observables, project) {
    return new ZipObservable(observables, project);
}

module.exports = exports['default'];
},{"../CompositeSubscription":2,"../Observable":4,"../Observer":5,"../Subscription":9,"../util/Symbol_observer":47,"../util/errorObject":49,"../util/tryCatch":51}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concatAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mergeAll = require('./mergeAll');

var _mergeAll2 = _interopRequireDefault(_mergeAll);

function concatAll() {
    return _mergeAll2['default'].call(this, 1);
}

module.exports = exports['default'];
},{"./mergeAll":30}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = select;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilErrorObject2 = _interopRequireDefault(_utilErrorObject);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var FilterObserver = (function (_Observer) {
    function FilterObserver(destination, predicate) {
        _classCallCheck(this, FilterObserver);

        _Observer.call(this, destination);
        this.predicate = predicate;
    }

    _inherits(FilterObserver, _Observer);

    FilterObserver.prototype._next = function _next(value) {
        var result = _utilTryCatch2['default'](this.predicate).call(this, value);
        if (result === _utilErrorObject2['default']) {
            return this.destination['throw'](_utilErrorObject2['default'].e);
        } else if (Boolean(result)) {
            return this.destination.next(value);
        }
    };

    return FilterObserver;
})(_Observer3['default']);

var FilterObservable = (function (_Observable) {
    function FilterObservable(source, predicate) {
        _classCallCheck(this, FilterObservable);

        _Observable.call(this, null);
        this.source = source;
        this.predicate = predicate;
    }

    _inherits(FilterObservable, _Observable);

    FilterObservable.prototype.subscriber = function subscriber(observer) {
        var filterObserver = new FilterObserver(observer, this.predicate);
        return _Subscription2['default'].from(this.source.subscriber(filterObserver), filterObserver);
    };

    return FilterObservable;
})(_Observable3['default']);

function select(predicate) {
    return new FilterObservable(this, predicate);
}

;
module.exports = exports['default'];
},{"../Observable":4,"../Observer":5,"../Subscription":9,"../util/errorObject":49,"../util/tryCatch":51}],26:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = flatMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _mergeAll = require('./mergeAll');

var _mergeAll2 = _interopRequireDefault(_mergeAll);

function flatMap(project) {
    var concurrent = arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];

    return _mergeAll2['default'].call(_map2['default'].call(this, project), concurrent);
}

module.exports = exports['default'];
},{"./map":27,"./mergeAll":30}],27:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = select;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilErrorObject2 = _interopRequireDefault(_utilErrorObject);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var MapObserver = (function (_Observer) {
    function MapObserver(destination, project) {
        _classCallCheck(this, MapObserver);

        _Observer.call(this, destination);
        this.project = project;
    }

    _inherits(MapObserver, _Observer);

    MapObserver.prototype._next = function _next(value) {
        value = _utilTryCatch2['default'](this.project).call(this, value);
        if (value === _utilErrorObject2['default']) {
            return this.destination['throw'](_utilErrorObject2['default'].e);
        } else {
            return this.destination.next(value);
        }
    };

    return MapObserver;
})(_Observer3['default']);

var MapObservable = (function (_Observable) {
    function MapObservable(source, project) {
        _classCallCheck(this, MapObservable);

        _Observable.call(this, null);
        this.source = source;
        this.project = project;
    }

    _inherits(MapObservable, _Observable);

    MapObservable.prototype.subscriber = function subscriber(observer) {
        var mapObserver = new MapObserver(observer, this.project);
        return _Subscription2['default'].from(this.source.subscriber(mapObserver), mapObserver);
    };

    return MapObservable;
})(_Observable3['default']);

function select(project) {
    return new MapObservable(this, project);
}

;
module.exports = exports['default'];
},{"../Observable":4,"../Observer":5,"../Subscription":9,"../util/errorObject":49,"../util/tryCatch":51}],28:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = mapTo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var MapToObserver = (function (_Observer) {
    function MapToObserver(destination, value) {
        _classCallCheck(this, MapToObserver);

        _Observer.call(this, destination);
        this.value = value;
    }

    _inherits(MapToObserver, _Observer);

    MapToObserver.prototype._next = function _next(_) {
        return this.destination.next(this.value);
    };

    return MapToObserver;
})(_Observer3['default']);

var MapToObservable = (function (_Observable) {
    function MapToObservable(source, value) {
        _classCallCheck(this, MapToObservable);

        _Observable.call(this, null);
        this.source = source;
        this.value = value;
    }

    _inherits(MapToObservable, _Observable);

    MapToObservable.prototype.subscriber = function subscriber(observer) {
        var mapToObserver = new MapToObserver(observer, this.value);
        return _Subscription2['default'].from(this.source.subscriber(mapToObserver), mapToObserver);
    };

    return MapToObservable;
})(_Observable3['default']);

function mapTo(value) {
    return new MapToObservable(this, value);
}

;
module.exports = exports['default'];
},{"../Observable":4,"../Observer":5,"../Subscription":9}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = merge;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

function merge(observables) {
    return _Observable2['default'].fromArray([this].concat(observables)).mergeAll();
}

module.exports = exports['default'];
},{"../Observable":4}],30:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = mergeAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observer3 = require('../Observer');

var _Observer4 = _interopRequireDefault(_Observer3);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _SerialSubscription = require('../SerialSubscription');

var _SerialSubscription2 = _interopRequireDefault(_SerialSubscription);

var _CompositeSubscription = require('../CompositeSubscription');

var _CompositeSubscription2 = _interopRequireDefault(_CompositeSubscription);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _utilSymbol_observer = require('../util/Symbol_observer');

var _utilSymbol_observer2 = _interopRequireDefault(_utilSymbol_observer);

var MergeAllObserver = (function (_Observer) {
    function MergeAllObserver(destination, concurrent) {
        _classCallCheck(this, MergeAllObserver);

        _Observer.call(this, destination);
        this.stopped = false;
        this.buffer = [];
        this.concurrent = concurrent;
        this.subscriptions = new _CompositeSubscription2['default']();
    }

    _inherits(MergeAllObserver, _Observer);

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
        _classCallCheck(this, MergeInnerObserver);

        _Observer2.call(this, parent.destination);
        this.parent = parent;
        this.subscription = subscription;
    }

    _inherits(MergeInnerObserver, _Observer2);

    MergeInnerObserver.prototype._return = function _return() {
        return this.parent._innerReturn(this);
    };

    return MergeInnerObserver;
})(_Observer4['default']);

var MergeAllObservable = (function (_Observable) {
    function MergeAllObservable(source, concurrent) {
        _classCallCheck(this, MergeAllObservable);

        _Observable.call(this, null);
        this.source = source;
        this.concurrent = concurrent;
    }

    _inherits(MergeAllObservable, _Observable);

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
},{"../CompositeSubscription":2,"../Observable":4,"../Observer":5,"../SerialSubscription":7,"../Subscription":9,"../util/Symbol_observer":47}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = multicast;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ConnectableObservable = require('../ConnectableObservable');

var _ConnectableObservable2 = _interopRequireDefault(_ConnectableObservable);

function multicast(subjectFactory) {
    return new _ConnectableObservable2['default'](this, subjectFactory);
}

;
module.exports = exports['default'];
},{"../ConnectableObservable":3}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = observeOn;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var ObserveOnObserver = (function (_Observer) {
    function ObserveOnObserver(destination, scheduler) {
        _classCallCheck(this, ObserveOnObserver);

        _Observer.call(this, destination);
        this.scheduler = scheduler;
    }

    _inherits(ObserveOnObserver, _Observer);

    ObserveOnObserver.prototype._next = function _next(value) {
        this.scheduler.schedule(0, [this.destination, value], dispatchNext);
        return { done: false };
    };

    ObserveOnObserver.prototype._throw = function _throw(err) {
        this.scheduler.schedule(0, [this.destination, err], dispatchThrow);
        return { done: true };
    };

    ObserveOnObserver.prototype._return = function _return(value) {
        this.scheduler.schedule(0, [this.destination, value], dispatchReturn);
        return { done: true };
    };

    return ObserveOnObserver;
})(_Observer3['default']);

function dispatchNext(_ref) {
    var destination = _ref[0];
    var value = _ref[1];

    var result = destination.next(value);
    if (result.done) {
        destination.dispose();
    }
}
function dispatchThrow(_ref2) {
    var destination = _ref2[0];
    var err = _ref2[1];

    var result = destination['throw'](err);
    destination.dispose();
}
function dispatchReturn(_ref3) {
    var destination = _ref3[0];
    var value = _ref3[1];

    var result = destination['return'](value);
    destination.dispose();
}

var ObserveOnObservable = (function (_Observable) {
    function ObserveOnObservable(source, scheduler) {
        _classCallCheck(this, ObserveOnObservable);

        _Observable.call(this, null);
        this.source = source;
        this.scheduler = scheduler;
    }

    _inherits(ObserveOnObservable, _Observable);

    ObserveOnObservable.prototype.subscriber = function subscriber(observer) {
        var observeOnObserver = new ObserveOnObserver(observer, this.scheduler);
        return _Subscription2['default'].from(this.source.subscriber(observeOnObserver), observeOnObserver);
    };

    return ObserveOnObservable;
})(_Observable3['default']);

function observeOn(scheduler) {
    return new ObserveOnObservable(this, scheduler);
}

module.exports = exports['default'];
},{"../Observable":4,"../Observer":5,"../Subscription":9}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = publish;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

function subjectFactory() {
    return new _Subject2['default']();
}

function publish() {
    return this.multicast(subjectFactory);
}

module.exports = exports['default'];
},{"../Subject":8}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = reduce;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilErrorObject2 = _interopRequireDefault(_utilErrorObject);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var ReduceObserver = (function (_Observer) {
    function ReduceObserver(destination, processor, initialValue) {
        _classCallCheck(this, ReduceObserver);

        _Observer.call(this, destination);
        this.processor = processor;
        this.aggregate = initialValue;
    }

    _inherits(ReduceObserver, _Observer);

    ReduceObserver.prototype._next = function _next(value) {
        var result = _utilTryCatch2['default'](this.processor)(this.aggregate, value);
        if (result === _utilErrorObject2['default'].e) {
            this.destination['throw'](_utilErrorObject2['default'].e);
        } else {
            this.aggregate = result;
        }
        return { done: false };
    };

    ReduceObserver.prototype._return = function _return(value) {
        this.destination.next(this.aggregate);
        return this.destination['return'](value);
    };

    return ReduceObserver;
})(_Observer3['default']);

var ReduceObservable = (function (_Observable) {
    function ReduceObservable(source, processor, initialValue) {
        _classCallCheck(this, ReduceObservable);

        _Observable.call(this, null);
        this.source = source;
        this.processor = processor;
        this.initialValue = initialValue;
    }

    _inherits(ReduceObservable, _Observable);

    ReduceObservable.prototype.subscriber = function subscriber(observer) {
        var reduceObserver = new ReduceObserver(observer, this.processor, this.initialValue);
        return _Subscription2['default'].from(this.source.subscriber(reduceObserver), reduceObserver);
    };

    return ReduceObservable;
})(_Observable3['default']);

function reduce(processor, initialValue) {
    return new ReduceObservable(this, processor, initialValue);
}

module.exports = exports['default'];
},{"../Observable":4,"../Observer":5,"../Subscription":9,"../util/errorObject":49,"../util/tryCatch":51}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = skip;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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
},{"../Observable":4,"../Observer":5,"../Subscription":9}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = subscribeOn;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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
},{"../Observable":4,"../SerialSubscription":7,"../util/Symbol_observer":47}],37:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = take;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Observer2 = require('../Observer');

var _Observer3 = _interopRequireDefault(_Observer2);

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var TakeObserver = (function (_Observer) {
    function TakeObserver(destination, count) {
        _classCallCheck(this, TakeObserver);

        _Observer.call(this, destination);
        this.counter = 0;
        this.count = count;
    }

    _inherits(TakeObserver, _Observer);

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
        _classCallCheck(this, TakeObservable);

        _Observable.call(this, null);
        this.source = source;
        this.count = count;
    }

    _inherits(TakeObservable, _Observable);

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
},{"../Observable":4,"../Observer":5,"../Subscription":9}],38:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = toArray;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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
},{"../Observable":4,"../Observer":5,"../Subscription":9}],39:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = zip;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

function zip(observables, project) {
    return _Observable2['default'].zip([this].concat(observables), project);
}

module.exports = exports['default'];
},{"../Observable":4}],40:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = zipAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

function zipAll(project) {
    return this.toArray().flatMap(function (observables) {
        return _Observable2['default'].zip(observables, project);
    });
}

module.exports = exports['default'];
},{"../Observable":4}],41:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Scheduler2 = require('./Scheduler');

var _Scheduler3 = _interopRequireDefault(_Scheduler2);

var _SchedulerActions = require('./SchedulerActions');

var NextTickScheduler = (function (_Scheduler) {
    function NextTickScheduler() {
        _classCallCheck(this, NextTickScheduler);

        if (_Scheduler != null) {
            _Scheduler.apply(this, arguments);
        }
    }

    _inherits(NextTickScheduler, _Scheduler);

    NextTickScheduler.prototype.scheduleNow = function scheduleNow(state, work) {
        var action = this.scheduled ? new _SchedulerActions.ScheduledAction(this, state, work) : new _SchedulerActions.NextScheduledAction(this, state, work);
        action.schedule();
        return action;
    };

    return NextTickScheduler;
})(_Scheduler3['default']);

exports['default'] = NextTickScheduler;
module.exports = exports['default'];
},{"./Scheduler":42,"./SchedulerActions":43}],42:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _SchedulerActions = require('./SchedulerActions');

var Scheduler = (function () {
    function Scheduler() {
        _classCallCheck(this, Scheduler);

        this.actions = [];
        this.active = false;
        this.scheduled = false;
    }

    Scheduler.prototype.schedule = function schedule(delay, state, work) {
        return delay <= 0 ? this.scheduleNow(state, work) : this.scheduleLater(state, work, delay);
    };

    Scheduler.prototype.flush = function flush() {
        if (!this.active) {
            this.active = true;
            var action;
            while (action = this.actions.shift()) {
                action.execute();
            }
            ;
            this.active = false;
        }
    };

    Scheduler.prototype.scheduleNow = function scheduleNow(state, work) {
        var action = new _SchedulerActions.ScheduledAction(this, state, work);
        action.schedule();
        return action;
    };

    Scheduler.prototype.scheduleLater = function scheduleLater(state, work, delay) {
        var action = new _SchedulerActions.FutureScheduledAction(this, state, work, delay);
        action.schedule();
        return action;
    };

    return Scheduler;
})();

exports['default'] = Scheduler;
module.exports = exports['default'];
},{"./SchedulerActions":43}],43:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _SerialSubscription2 = require('../SerialSubscription');

var _SerialSubscription3 = _interopRequireDefault(_SerialSubscription2);

var _utilImmediate = require('../util/Immediate');

var _utilImmediate2 = _interopRequireDefault(_utilImmediate);

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var ScheduledAction = (function (_SerialSubscription) {
    function ScheduledAction(scheduler, state, work) {
        _classCallCheck(this, ScheduledAction);

        _SerialSubscription.call(this, null);
        this.scheduler = scheduler;
        this.work = work;
        this.state = state;
    }

    _inherits(ScheduledAction, _SerialSubscription);

    ScheduledAction.prototype.schedule = function schedule() {
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        actions.push(this);
        scheduler.flush();
        return this;
    };

    ScheduledAction.prototype.execute = function execute() {
        if (this.unsubscribed) {
            throw new Error('How did did we execute a canceled ScheduledAction?');
        }
        this.add(_Subscription2['default'].from(this.work(this.state), this.observer));
    };

    ScheduledAction.prototype.unsubscribe = function unsubscribe() {
        _SerialSubscription.prototype.unsubscribe.call(this);
        var actions = this.scheduler.actions;
        var index = Array.isArray(actions) ? actions.indexOf(this) : -1;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        this.work = void 0;
        this.state = void 0;
        this.scheduler = void 0;
    };

    return ScheduledAction;
})(_SerialSubscription3['default']);

exports.ScheduledAction = ScheduledAction;

var NextScheduledAction = (function (_ScheduledAction) {
    function NextScheduledAction() {
        _classCallCheck(this, NextScheduledAction);

        if (_ScheduledAction != null) {
            _ScheduledAction.apply(this, arguments);
        }
    }

    _inherits(NextScheduledAction, _ScheduledAction);

    NextScheduledAction.prototype.schedule = function schedule() {
        var self = this;
        var scheduler = this.scheduler;
        scheduler.actions.push(this);
        if (!scheduler.scheduled) {
            scheduler.active = true;
            scheduler.scheduled = true;
            this.id = _utilImmediate2['default'].setImmediate(function () {
                self.id = void 0;
                scheduler.active = false;
                scheduler.scheduled = false;
                scheduler.flush();
            });
        }
        return this;
    };

    NextScheduledAction.prototype.unsubscribe = function unsubscribe() {
        var scheduler = this.scheduler;
        if (scheduler.actions.length === 0) {
            scheduler.active = false;
            scheduler.scheduled = false;
            var id = this.id;
            if (id) {
                this.id = void 0;
                _utilImmediate2['default'].clearImmediate(id);
            }
        }
        _ScheduledAction.prototype.unsubscribe.call(this);
    };

    return NextScheduledAction;
})(ScheduledAction);

exports.NextScheduledAction = NextScheduledAction;

var FutureScheduledAction = (function (_ScheduledAction2) {
    function FutureScheduledAction(scheduler, state, work, delay) {
        _classCallCheck(this, FutureScheduledAction);

        _ScheduledAction2.call(this, scheduler, state, work);
        this.delay = delay;
    }

    _inherits(FutureScheduledAction, _ScheduledAction2);

    FutureScheduledAction.prototype.schedule = function schedule() {
        var self = this;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = undefined;
            clearTimeout(id);
        }
        var scheduleAction = _ScheduledAction2.prototype.schedule;
        this.id = setTimeout(function executeFutureAction() {
            self.id = void 0;
            scheduleAction.call(self, self.state);
        }, this.delay);
        return this;
    };

    FutureScheduledAction.prototype.unsubscribe = function unsubscribe() {
        var id = this.id;
        if (id != null) {
            this.id = void 0;
            clearTimeout(id);
        }
        _ScheduledAction2.prototype.unsubscribe.call(this);
    };

    return FutureScheduledAction;
})(ScheduledAction);

exports.FutureScheduledAction = FutureScheduledAction;
},{"../SerialSubscription":7,"../Subscription":9,"../util/Immediate":46}],44:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Scheduler = require('./Scheduler');

var _Scheduler2 = _interopRequireDefault(_Scheduler);

var immediate = new _Scheduler2['default']();
exports['default'] = immediate;
module.exports = exports['default'];
},{"./Scheduler":42}],45:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _NextTickScheduler = require('./NextTickScheduler');

var _NextTickScheduler2 = _interopRequireDefault(_NextTickScheduler);

var nextTick = new _NextTickScheduler2['default']();
exports['default'] = nextTick;
module.exports = exports['default'];
},{"./NextTickScheduler":41}],46:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
All credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/

var _root = require("./root");

var _root2 = _interopRequireDefault(_root);

var Immediate = {};
if (_root2["default"] && _root2["default"].setImmediate) {
    Immediate.setImmediate = _root2["default"].setImmediate;
    Immediate.clearImmediate = _root2["default"].clearImmediate;
} else {
    Immediate = (function (global, Immediate) {
        var nextHandle = 1,
            tasksByHandle = {},
            currentlyRunningATask = false,
            doc = global.document,
            setImmediate;
        // Don't get fooled by e.g. browserify environments.
        if (({}).toString.call(global.process) === "[object process]") {
            // For Node.js before 0.9
            setImmediate = installNextTickImplementation();
        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            setImmediate = installPostMessageImplementation();
        } else if (global.MessageChannel) {
            // For web workers, where supported
            setImmediate = installMessageChannelImplementation();
        } else if (doc && "onreadystatechange" in doc.createElement("script")) {
            // For IE 6–8
            setImmediate = installReadyStateChangeImplementation();
        } else {
            // For older browsers
            setImmediate = installSetTimeoutImplementation();
        }
        Immediate.setImmediate = setImmediate;
        Immediate.clearImmediate = clearImmediate;
        return Immediate;
        function clearImmediate(handle) {
            delete tasksByHandle[handle];
        }
        function addFromSetImmediateArguments(args) {
            tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
            return nextHandle++;
        }
        // This function accepts the same arguments as setImmediate, but
        // returns a function that requires no arguments.
        function partiallyApplied(handler) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return function () {
                if (typeof handler === "function") {
                    handler.apply(undefined, args);
                } else {
                    new Function("" + handler)();
                }
            };
        }
        function runIfPresent(handle) {
            // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
            // So if we're currently running a task, we'll need to delay this invocation.
            if (currentlyRunningATask) {
                // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                // "too much recursion" error.
                setTimeout(partiallyApplied(runIfPresent, handle), 0);
            } else {
                var task = tasksByHandle[handle];
                if (task) {
                    currentlyRunningATask = true;
                    try {
                        task();
                    } finally {
                        clearImmediate(handle);
                        currentlyRunningATask = false;
                    }
                }
            }
        }
        function installNextTickImplementation() {
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                global.process.nextTick(partiallyApplied(runIfPresent, handle));
                return handle;
            };
        }
        function canUsePostMessage() {
            // The test against `importScripts` prevents this implementation from being installed inside a web worker,
            // where `global.postMessage` means something completely different and can't be used for this purpose.
            if (global.postMessage && !global.importScripts) {
                var postMessageIsAsynchronous = true;
                var oldOnMessage = global.onmessage;
                global.onmessage = function () {
                    postMessageIsAsynchronous = false;
                };
                global.postMessage("", "*");
                global.onmessage = oldOnMessage;
                return postMessageIsAsynchronous;
            }
        }
        function installPostMessageImplementation() {
            // Installs an event handler on `global` for the `message` event: see
            // * https://developer.mozilla.org/en/DOM/window.postMessage
            // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
            var messagePrefix = "setImmediate$" + Math.random() + "$";
            var onGlobalMessage = function onGlobalMessage(event) {
                if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                    runIfPresent(+event.data.slice(messagePrefix.length));
                }
            };
            if (global.addEventListener) {
                global.addEventListener("message", onGlobalMessage, false);
            } else {
                global.attachEvent("onmessage", onGlobalMessage);
            }
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                global.postMessage(messagePrefix + handle, "*");
                return handle;
            };
        }
        function installMessageChannelImplementation() {
            var channel = new MessageChannel();
            channel.port1.onmessage = function (event) {
                var handle = event.data;
                runIfPresent(handle);
            };
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                channel.port2.postMessage(handle);
                return handle;
            };
        }
        function installReadyStateChangeImplementation() {
            var html = doc.documentElement;
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                var script = doc.createElement("script");
                script.onreadystatechange = function () {
                    runIfPresent(handle);
                    script.onreadystatechange = null;
                    html.removeChild(script);
                    script = null;
                };
                html.appendChild(script);
                return handle;
            };
        }
        function installSetTimeoutImplementation() {
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                setTimeout(partiallyApplied(runIfPresent, handle), 0);
                return handle;
            };
        }
    })(_root2["default"], Immediate);
}
exports["default"] = Immediate;
module.exports = exports["default"];
},{"./root":50}],47:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

if (!_root2['default'].Symbol) {
    _root2['default'].Symbol = {};
}
if (!_root2['default'].Symbol.observer) {
    if (typeof _root2['default'].Symbol['for'] === 'function') {
        _root2['default'].Symbol.observer = _root2['default'].Symbol['for']('observer');
    }
    _root2['default'].Symbol.observer = '@@observer';
}
exports['default'] = _root2['default'].Symbol.observer;
module.exports = exports['default'];
},{"./root":50}],48:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = arraySlice;
var isArray = Array.isArray;

function arraySlice(array) {
    var index = arguments[1] === undefined ? 0 : arguments[1];

    if (isArray(array) === false) {
        return array;
    }
    var i = -1;
    var n = Math.max(array.length - index, 0);
    var array2 = new Array(n);
    while (++i < n) {
        array2[i] = array[i + index];
    }
    return array2;
}

;
module.exports = exports["default"];
},{}],49:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var errorObject = { e: {} };
exports["default"] = errorObject;
module.exports = exports["default"];
},{}],50:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
var root = objectTypes[typeof window] && window || undefined,
    freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
    freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
    moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
    freeGlobal = objectTypes[typeof global] && global;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
}
exports['default'] = root;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],51:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = tryCatch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _errorObject = require('./errorObject');

var _errorObject2 = _interopRequireDefault(_errorObject);

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    } catch (e) {
        _errorObject2['default'].e = e;
        return _errorObject2['default'];
    }
}

function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

;
module.exports = exports['default'];
},{"./errorObject":49}],52:[function(require,module,exports){
(function (global){
(function (root, factory) {
  root.RxNext = factory();
}(window || global || this, function(){
  return require('../dist/cjs/RxNext');	
}));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../dist/cjs/RxNext":6}]},{},[52]);
