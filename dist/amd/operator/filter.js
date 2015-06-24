define(['exports', 'module', '../Observer', '../util/tryCatch', '../util/errorObject', '../Observable', '../Subscription'], function (exports, module, _Observer2, _utilTryCatch, _utilErrorObject, _Observable2, _Subscription) {
    'use strict';

    module.exports = select;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var _Observer3 = _interopRequire(_Observer2);

    var _try_catch = _interopRequire(_utilTryCatch);

    var _error_obj = _interopRequire(_utilErrorObject);

    var _Observable3 = _interopRequire(_Observable2);

    var _Subscription2 = _interopRequire(_Subscription);

    var FilterObserver = (function (_Observer) {
        function FilterObserver(destination, predicate) {
            _classCallCheck(this, FilterObserver);

            _Observer.call(this, destination);
            this.predicate = predicate;
        }

        _inherits(FilterObserver, _Observer);

        FilterObserver.prototype._next = function _next(value) {
            var result = _try_catch(this.predicate).call(this, value);
            if (result === _error_obj) {
                return this.destination['throw'](_error_obj.e);
            } else if (Boolean(result)) {
                return this.destination.next(value);
            }
        };

        return FilterObserver;
    })(_Observer3);

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
            return _Subscription2.from(this.source.subscriber(filterObserver), filterObserver);
        };

        return FilterObservable;
    })(_Observable3);

    function select(predicate) {
        return new FilterObservable(this, predicate);
    }

    ;
});