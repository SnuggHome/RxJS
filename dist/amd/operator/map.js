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

    var MapObserver = (function (_Observer) {
        function MapObserver(destination, project) {
            _classCallCheck(this, MapObserver);

            _Observer.call(this, destination);
            this.project = project;
        }

        _inherits(MapObserver, _Observer);

        MapObserver.prototype._next = function _next(value) {
            value = _try_catch(this.project).call(this, value);
            if (value === _error_obj) {
                return this.destination['throw'](_error_obj.e);
            } else {
                return this.destination.next(value);
            }
        };

        return MapObserver;
    })(_Observer3);

    var MapObservable = (function (_Observable) {
        function MapObservable(source, project) {
            _classCallCheck(this, MapObservable);

            _Observable.call(this, null);
            this.source = source;
            this.project = project;
        }

        _inherits(MapObservable, _Observable);

        MapObservable.prototype.subscriber = function subscriber(observer) {
            var mapObserver = new MapObserver(observer, this.project);
            return _Subscription2.from(this.source.subscriber(mapObserver), mapObserver);
        };

        return MapObservable;
    })(_Observable3);

    function select(project) {
        return new MapObservable(this, project);
    }

    ;
});