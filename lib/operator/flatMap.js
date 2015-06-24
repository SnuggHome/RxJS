'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = flatMap;

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _mergeAll = require('./mergeAll');

var _mergeAll2 = _interopRequireDefault(_mergeAll);

function flatMap(project) {
    var concurrent = arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];

    return _mergeAll2['default'].call(_map2['default'].call(this, project), concurrent);
}

module.exports = exports['default'];
//# sourceMappingURL=flatMap.js.map