'use strict';

exports.__esModule = true;
exports['default'] = reduce;

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = babelHelpers.interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var _utilErrorObject2 = babelHelpers.interopRequireDefault(_utilErrorObject);

var _Observable2 = require('../Observable');

var _Observable3 = babelHelpers.interopRequireDefault(_Observable2);

var _Observer2 = require('../Observer');

var _Observer3 = babelHelpers.interopRequireDefault(_Observer2);

var _Subscription = require('../Subscription');

var _Subscription2 = babelHelpers.interopRequireDefault(_Subscription);

var ReduceObserver = (function (_Observer) {
    function ReduceObserver(destination, processor, initialValue) {
        babelHelpers.classCallCheck(this, ReduceObserver);

        _Observer.call(this, destination);
        this.processor = processor;
        this.aggregate = initialValue;
    }

    babelHelpers.inherits(ReduceObserver, _Observer);

    ReduceObserver.prototype._next = function _next(value) {
        var result = _utilTryCatch2['default'](this.processor)(this.aggregate, value);
        if (result === _utilErrorObject2['default'].e) {
            this.destination['throw'](_utilErrorObject2['default'].e);
        } else {
            this.aggregate = result;
        }
        return { done: false };
    };

    ReduceObserver.prototype._return = function _return(value) {
        this.destination.next(this.aggregate);
        return this.destination['return'](value);
    };

    return ReduceObserver;
})(_Observer3['default']);

var ReduceObservable = (function (_Observable) {
    function ReduceObservable(source, processor, initialValue) {
        babelHelpers.classCallCheck(this, ReduceObservable);

        _Observable.call(this, null);
        this.source = source;
        this.processor = processor;
        this.initialValue = initialValue;
    }

    babelHelpers.inherits(ReduceObservable, _Observable);

    ReduceObservable.prototype.subscriber = function subscriber(observer) {
        var reduceObserver = new ReduceObserver(observer, this.processor, this.initialValue);
        return _Subscription2['default'].from(this.source.subscriber(reduceObserver), reduceObserver);
    };

    return ReduceObservable;
})(_Observable3['default']);

function reduce(processor, initialValue) {
    return new ReduceObservable(this, processor, initialValue);
}

module.exports = exports['default'];
//# sourceMappingURL=reduce.js.map