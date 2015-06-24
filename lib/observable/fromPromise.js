'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = fromPromise;

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var PromiseObservable = (function (_Observable) {
    function PromiseObservable(promise) {
        _classCallCheck(this, PromiseObservable);

        _Observable.call(this, null);
        this.promise = promise;
    }

    _inherits(PromiseObservable, _Observable);

    PromiseObservable.prototype.subscriber = function subscriber(observer) {
        var promise = this.promise;
        if (promise) {
            promise.then(function (x) {
                if (!observer.unsubscribed) {
                    observer.next(x);
                    observer['return'](x);
                }
            });
        }
    };

    return PromiseObservable;
})(_Observable3['default']);

function fromPromise(promise) {
    return new PromiseObservable(promise);
}

module.exports = exports['default'];
//# sourceMappingURL=fromPromise.js.map