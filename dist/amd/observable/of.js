define(['exports', 'module', './ArrayObservable'], function (exports, module, _ArrayObservable) {
    'use strict';

    module.exports = of;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _ArrayObservable2 = _interopRequire(_ArrayObservable);

    function of() {
        for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
            values[_key] = arguments[_key];
        }

        return new _ArrayObservable2(values);
    }

    ;
});