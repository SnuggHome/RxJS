'use strict';

exports.__esModule = true;
exports['default'] = timer;

var _Observable2 = require('../Observable');

var _Observable3 = babelHelpers.interopRequireDefault(_Observable2);

var _schedulerNextTick = require('../scheduler/nextTick');

var _schedulerNextTick2 = babelHelpers.interopRequireDefault(_schedulerNextTick);

var TimerObservable = (function (_Observable) {
    function TimerObservable(delay, scheduler) {
        babelHelpers.classCallCheck(this, TimerObservable);

        _Observable.call(this, null);
        this.delay = delay;
        this.scheduler = scheduler;
    }

    babelHelpers.inherits(TimerObservable, _Observable);

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
//# sourceMappingURL=timer.js.map