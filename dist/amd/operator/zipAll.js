define(['exports', 'module', '../Observable'], function (exports, module, _Observable) {
    'use strict';

    module.exports = zipAll;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    var _Observable2 = _interopRequire(_Observable);

    function zipAll(project) {
        return this.toArray().flatMap(function (observables) {
            return _Observable2.zip(observables, project);
        });
    }
});