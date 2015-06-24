define(['exports', 'module', './Observable', './Observer', './scheduler/nextTick', './scheduler/immediate', './Subscription', './CompositeSubscription', './SerialSubscription', './Subject', './BehaviorSubject', './ConnectableObservable', './observable/value', './observable/return', './observable/fromEventPattern', './observable/fromEvent', './observable/throw', './observable/empty', './observable/range', './observable/fromArray', './observable/zip', './observable/fromPromise', './observable/of', './observable/timer', './observable/interval', './operator/filter', './operator/map', './operator/mapTo', './operator/mergeAll', './operator/flatMap', './operator/concatAll', './operator/skip', './operator/take', './operator/subscribeOn', './operator/observeOn', './operator/zipAll', './operator/zip', './operator/merge', './operator/toArray', './operator/multicast', './operator/publish', './operator/reduce'], function (exports, module, _Observable, _Observer, _schedulerNextTick, _schedulerImmediate, _Subscription, _CompositeSubscription, _SerialSubscription, _Subject, _BehaviorSubject, _ConnectableObservable, _observableValue, _observableReturn, _observableFromEventPattern, _observableFromEvent, _observableThrow, _observableEmpty, _observableRange, _observableFromArray, _observableZip, _observableFromPromise, _observableOf, _observableTimer, _observableInterval, _operatorFilter, _operatorMap, _operatorMapTo, _operatorMergeAll, _operatorFlatMap, _operatorConcatAll, _operatorSkip, _operatorTake, _operatorSubscribeOn, _operatorObserveOn, _operatorZipAll, _operatorZip, _operatorMerge, _operatorToArray, _operatorMulticast, _operatorPublish, _operatorReduce) {
    'use strict';

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _Observable2 = _interopRequire(_Observable);

    var _Observer2 = _interopRequire(_Observer);

    var _nextTick = _interopRequire(_schedulerNextTick);

    var _immediate = _interopRequire(_schedulerImmediate);

    var _Subscription2 = _interopRequire(_Subscription);

    var _CompositeSubscription2 = _interopRequire(_CompositeSubscription);

    var _SerialSubscription2 = _interopRequire(_SerialSubscription);

    var _Subject2 = _interopRequire(_Subject);

    var _BehaviorSubject2 = _interopRequire(_BehaviorSubject);

    var _ConnectableObservable2 = _interopRequire(_ConnectableObservable);

    var _value = _interopRequire(_observableValue);

    var _return2 = _interopRequire(_observableReturn);

    var _fromEventPattern = _interopRequire(_observableFromEventPattern);

    var _fromEvent = _interopRequire(_observableFromEvent);

    var _throw2 = _interopRequire(_observableThrow);

    var _empty = _interopRequire(_observableEmpty);

    var _range = _interopRequire(_observableRange);

    var _fromArray = _interopRequire(_observableFromArray);

    var _zip = _interopRequire(_observableZip);

    var _fromPromise = _interopRequire(_observableFromPromise);

    var _of2 = _interopRequire(_observableOf);

    var _timer = _interopRequire(_observableTimer);

    var _interval = _interopRequire(_observableInterval);

    var _filter = _interopRequire(_operatorFilter);

    var _map = _interopRequire(_operatorMap);

    var _mapTo = _interopRequire(_operatorMapTo);

    var _mergeAll = _interopRequire(_operatorMergeAll);

    var _flatMap = _interopRequire(_operatorFlatMap);

    var _concatAll = _interopRequire(_operatorConcatAll);

    var _skip = _interopRequire(_operatorSkip);

    var _take = _interopRequire(_operatorTake);

    var _subscribeOn = _interopRequire(_operatorSubscribeOn);

    var _observeOn = _interopRequire(_operatorObserveOn);

    var _zipAll = _interopRequire(_operatorZipAll);

    var _zipProto = _interopRequire(_operatorZip);

    var _mergeProto = _interopRequire(_operatorMerge);

    var _toArray = _interopRequire(_operatorToArray);

    var _multicast = _interopRequire(_operatorMulticast);

    var _publish = _interopRequire(_operatorPublish);

    var _reduce = _interopRequire(_operatorReduce);

    _Observable2.value = _value;
    _Observable2['return'] = _return2;
    _Observable2.fromEventPattern = _fromEventPattern;
    _Observable2.fromEvent = _fromEvent;
    _Observable2['throw'] = _throw2;
    _Observable2.empty = _empty;
    _Observable2.range = _range;
    _Observable2.fromArray = _fromArray;
    _Observable2.zip = _zip;
    _Observable2.fromPromise = _fromPromise;
    _Observable2.of = _of2;
    _Observable2.timer = _timer;
    _Observable2.interval = _interval;
    _Observable2.prototype.filter = _filter;
    _Observable2.prototype.map = _map;
    _Observable2.prototype.mapTo = _mapTo;
    _Observable2.prototype.mergeAll = _mergeAll;
    _Observable2.prototype.flatMap = _flatMap;
    _Observable2.prototype.concatAll = _concatAll;
    _Observable2.prototype.skip = _skip;
    _Observable2.prototype.take = _take;
    _Observable2.prototype.subscribeOn = _subscribeOn;
    _Observable2.prototype.observeOn = _observeOn;
    _Observable2.prototype.zipAll = _zipAll;
    _Observable2.prototype.zip = _zipProto;
    _Observable2.prototype.merge = _mergeProto;
    _Observable2.prototype.toArray = _toArray;
    _Observable2.prototype.multicast = _multicast;
    _Observable2.prototype.publish = _publish;
    _Observable2.prototype.reduce = _reduce;
    var RxNext = {
        Scheduler: {
            nextTick: _nextTick,
            immediate: _immediate
        },
        Observer: _Observer2,
        Observable: _Observable2,
        Subscription: _Subscription2,
        CompositeSubscription: _CompositeSubscription2,
        SerialSubscription: _SerialSubscription2,
        Subject: _Subject2,
        BehaviorSubject: _BehaviorSubject2,
        ConnectableObservable: _ConnectableObservable2
    };
    module.exports = RxNext;
});