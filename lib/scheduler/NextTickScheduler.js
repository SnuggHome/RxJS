'use strict';

exports.__esModule = true;

var _Scheduler2 = require('./Scheduler');

var _Scheduler3 = babelHelpers.interopRequireDefault(_Scheduler2);

var _SchedulerActions = require('./SchedulerActions');

var NextTickScheduler = (function (_Scheduler) {
    function NextTickScheduler() {
        babelHelpers.classCallCheck(this, NextTickScheduler);

        if (_Scheduler != null) {
            _Scheduler.apply(this, arguments);
        }
    }

    babelHelpers.inherits(NextTickScheduler, _Scheduler);

    NextTickScheduler.prototype.scheduleNow = function scheduleNow(state, work) {
        var action = this.scheduled ? new _SchedulerActions.ScheduledAction(this, state, work) : new _SchedulerActions.NextScheduledAction(this, state, work);
        action.schedule();
        return action;
    };

    return NextTickScheduler;
})(_Scheduler3['default']);

exports['default'] = NextTickScheduler;
module.exports = exports['default'];
//# sourceMappingURL=NextTickScheduler.js.map