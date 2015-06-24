define(['exports', 'module', '../Subject'], function (exports, module, _Subject) {
    'use strict';

    module.exports = publish;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _Subject2 = _interopRequire(_Subject);

    function subjectFactory() {
        return new _Subject2();
    }

    function publish() {
        return this.multicast(subjectFactory);
    }
});