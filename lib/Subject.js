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