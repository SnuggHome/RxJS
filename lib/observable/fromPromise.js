'use strict';

exports.__esModule = true;
exports['default'] = fromPromise;

var _Observable2 = require('../Observable');

var _Observable3 = babelHelpers.interopRequireDefault(_Observable2);

var PromiseObservable = (function (_Observable) {
    function PromiseObservable(promise) {
        babelHelpers.classCallCheck(this, PromiseObservable);

        _Observable.call(this, null);
        this.promise = promise;
    }

    babelHelpers.inherits(PromiseObservable, _Observable);

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