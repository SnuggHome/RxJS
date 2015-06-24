'use strict';

exports.__esModule = true;
exports['default'] = select;

var _Observer2 = require('../Observer');

var _Observer3 = babelHelpers.interopRequireDefault(_Observer2);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = babelHelpers.interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilErrorObject2 = babelHelpers.interopRequireDefault(_utilErrorObject);

var _Observable2 = require('../Observable');

var _Observable3 = babelHelpers.interopRequireDefault(_Observable2);

var _Subscription = require('../Subscription');

var _Subscription2 = babelHelpers.interopRequireDefault(_Subscription);

var MapObserver = (function (_Observer) {
    function MapObserver(destination, project) {
        babelHelpers.classCallCheck(this, MapObserver);

        _Observer.call(this, destination);
        this.project = project;
    }

    babelHelpers.inherits(MapObserver, _Observer);

    MapObserver.prototype._next = function _next(value) {
        value = _utilTryCatch2['default'](this.project).call(this, value);
        if (value === _utilErrorObject2['default']) {
            return this.destination['throw'](_utilErrorObject2['default'].e);
        } else {
            return this.destination.next(value);
        }
    };

    return MapObserver;
})(_Observer3['default']);

var MapObservable = (function (_Observable) {
    function MapObservable(source, project) {
        babelHelpers.classCallCheck(this, MapObservable);

        _Observable.call(this, null);
        this.source = source;
        this.project = project;
    }

    babelHelpers.inherits(MapObservable, _Observable);

    MapObservable.prototype.subscriber = function subscriber(observer) {
        var mapObserver = new MapObserver(observer, this.project);
        return _Subscription2['default'].from(this.source.subscriber(mapObserver), mapObserver);
    };

    return MapObservable;
})(_Observable3['default']);

function select(project) {
    return new MapObservable(this, project);
}

;
module.exports = exports['default'];
//# sourceMappingURL=map.js.map