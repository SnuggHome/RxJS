define(['exports', 'module', '../Observable', '../Observer', '../Subscription'], function (exports, module, _Observable2, _Observer2, _Subscription) {
    'use strict';

    module.exports = toArray;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var _Observable3 = _interopRequire(_Observable2);

    var _Observer3 = _interopRequire(_Observer2);

    var _Subscription2 = _interopRequire(_Subscription);

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
    })(_Observer3);

    var ToArrayObservable = (function (_Observable) {
        function ToArrayObservable(source) {
            _classCallCheck(this, ToArrayObservable);

            _Observable.call(this, null);
            this.source = source;
        }

        _inherits(ToArrayObservable, _Observable);

        ToArrayObservable.prototype.subscriber = function subscriber(observer) {
            var toArrayObserver = new ToArrayObserver(observer);
            return _Subscription2.from(this.source.subscriber(toArrayObserver), toArrayObserver);
        };

        return ToArrayObservable;
    })(_Observable3);

    function toArray() {
        return new ToArrayObservable(this);
    }
});