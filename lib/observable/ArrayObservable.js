'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var ArrayObservable = (function (_Observable) {
    function ArrayObservable(array) {
        _classCallCheck(this, ArrayObservable);

        _Observable.call(this, null);
        this.array = array;
    }

    _inherits(ArrayObservable, _Observable);

    ArrayObservable.prototype.subscriber = function subscriber(observer) {
        var i, len;
        var array = this.array;
        if (Array.isArray(array)) {
            for (i = 0, len = array.length; i < len && !observer.unsubscribed; i++) {
                observer.next(array[i]);
            }
        }
        observer['return']();
    };

    return ArrayObservable;
})(_Observable3['default']);

exports['default'] = ArrayObservable;
module.exports = exports['default'];
//# sourceMappingURL=ArrayObservable.js.map