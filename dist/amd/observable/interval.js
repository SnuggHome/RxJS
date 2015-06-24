define(['exports', 'module', '../Observable', '../Observer', '../scheduler/nextTick'], function (exports, module, _Observable2, _Observer2, _schedulerNextTick) {
    'use strict';

    module.exports = timer;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var _Observable3 = _interopRequire(_Observable2);

    var _Observer3 = _interopRequire(_Observer2);

    var _nextTick = _interopRequire(_schedulerNextTick);

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
    })(_Observable3);

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
    })(_Observer3);

    function dispatch(observer) {
        observer.emitNext();
    }

    function timer() {
        var interval = arguments[0] === undefined ? 0 : arguments[0];
        var scheduler = arguments[1] === undefined ? _nextTick : arguments[1];

        return new IntervalObservable(interval, scheduler);
    }

    ;
});