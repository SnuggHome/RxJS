'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Scheduler2 = require('./Scheduler');

var _Scheduler3 = _interopRequireDefault(_Scheduler2);

var _SchedulerActions = require('./SchedulerActions');

var NextTickScheduler = (function (_Scheduler) {
    function NextTickScheduler() {
        _classCallCheck(this, NextTickScheduler);

        _Scheduler.apply(this, arguments);
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
//# sourceMappingURL=NextTickScheduler.js.map