'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = merge;

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

function merge(observables) {
    return _Observable2['default'].fromArray([this].concat(observables)).mergeAll();
}

module.exports = exports['default'];
//# sourceMappingURL=merge.js.map