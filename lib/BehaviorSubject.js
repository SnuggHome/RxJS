'use strict';

exports.__esModule = true;

var _utilSymbol_observer = require('./util/Symbol_observer');

var _utilSymbol_observer2 = babelHelpers.interopRequireDefault(_utilSymbol_observer);

var _Subscription = require('./Subscription');

var _Subscription2 = babelHelpers.interopRequireDefault(_Subscription);

var _Subject2 = require('./Subject');

var _Subject3 = babelHelpers.interopRequireDefault(_Subject2);

var BehaviorSubject = (function (_Subject) {
    function BehaviorSubject(value) {
        babelHelpers.classCallCheck(this, BehaviorSubject);

        _Subject.call(this);
        this.value = value;
    }

    babelHelpers.inherits(BehaviorSubject, _Subject);

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
//# sourceMappingURL=BehaviorSubject.js.map