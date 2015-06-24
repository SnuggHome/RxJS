define(['exports', 'module', '../ConnectableObservable'], function (exports, module, _ConnectableObservable) {
    'use strict';

    module.exports = multicast;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _ConnectableObservable2 = _interopRequire(_ConnectableObservable);

    function multicast(subjectFactory) {
        return new _ConnectableObservable2(this, subjectFactory);
    }

    ;
});