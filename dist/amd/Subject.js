define(['exports', 'module', './Observable', './util/Symbol_observer', './Subscription'], function (exports, module, _Observable2, _utilSymbol_observer, _Subscription2) {
    'use strict';

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var _Observable3 = _interopRequire(_Observable2);

    var _$$observer = _interopRequire(_utilSymbol_observer);

    var _Subscription3 = _interopRequire(_Subscription2);

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

        Subject.prototype[_$$observer] = function (observer) {
            this.observers.push(observer);
            var subscription = new _Subscription3(null, observer);
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
    })(_Observable3);

    module.exports = Subject;

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
    })(_Subscription3);
});