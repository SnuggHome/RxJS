'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = zipAll;

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

function zipAll(project) {
    return this.toArray().flatMap(function (observables) {
        return _Observable2['default'].zip(observables, project);
    });
}

module.exports = exports['default'];
//# sourceMappingURL=zipAll.js.map