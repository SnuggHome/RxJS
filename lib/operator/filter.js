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

var FilterObserver = (function (_Observer) {
    function FilterObserver(destination, predicate) {
        babelHelpers.classCallCheck(this, FilterObserver);

        _Observer.call(this, destination);
        this.predicate = predicate;
    }

    babelHelpers.inherits(FilterObserver, _Observer);

    FilterObserver.prototype._next = function _next(value) {
        var result = _utilTryCatch2['default'](this.predicate).call(this, value);
        if (result === _utilErrorObject2['default']) {
            return this.destination['throw'](_utilErrorObject2['default'].e);
        } else if (Boolean(result)) {
            return this.destination.next(value);
        }
    };

    return FilterObserver;
})(_Observer3['default']);

var FilterObservable = (function (_Observable) {
    function FilterObservable(source, predicate) {
        babelHelpers.classCallCheck(this, FilterObservable);

        _Observable.call(this, null);
        this.source = source;
        this.predicate = predicate;
    }

    babelHelpers.inherits(FilterObservable, _Observable);

    FilterObservable.prototype.subscriber = function subscriber(observer) {
        var filterObserver = new FilterObserver(observer, this.predicate);
        return _Subscription2['default'].from(this.source.subscriber(filterObserver), filterObserver);
    };

    return FilterObservable;
})(_Observable3['default']);

function select(predicate) {
    return new FilterObservable(this, predicate);
}

;
module.exports = exports['default'];
//# sourceMappingURL=filter.js.map