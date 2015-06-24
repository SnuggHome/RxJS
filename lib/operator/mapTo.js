'use strict';

exports.__esModule = true;
exports['default'] = mapTo;

var _Observer2 = require('../Observer');

var _Observer3 = babelHelpers.interopRequireDefault(_Observer2);

var _Observable2 = require('../Observable');

var _Observable3 = babelHelpers.interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = babelHelpers.interopRequireDefault(_Subscription);

var MapToObserver = (function (_Observer) {
    function MapToObserver(destination, value) {
        babelHelpers.classCallCheck(this, MapToObserver);

        _Observer.call(this, destination);
        this.value = value;
    }

    babelHelpers.inherits(MapToObserver, _Observer);

    MapToObserver.prototype._next = function _next(_) {
        return this.destination.next(this.value);
    };

    return MapToObserver;
})(_Observer3['default']);

var MapToObservable = (function (_Observable) {
    function MapToObservable(source, value) {
        babelHelpers.classCallCheck(this, MapToObservable);

        _Observable.call(this, null);
        this.source = source;
        this.value = value;
    }

    babelHelpers.inherits(MapToObservable, _Observable);

    MapToObservable.prototype.subscriber = function subscriber(observer) {
        var mapToObserver = new MapToObserver(observer, this.value);
        return _Subscription2['default'].from(this.source.subscriber(mapToObserver), mapToObserver);
    };

    return MapToObservable;
})(_Observable3['default']);

function mapTo(value) {
    return new MapToObservable(this, value);
}

;
module.exports = exports['default'];
//# sourceMappingURL=mapTo.js.map