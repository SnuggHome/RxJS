'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = multicast;

var _ConnectableObservable = require('../ConnectableObservable');

var _ConnectableObservable2 = _interopRequireDefault(_ConnectableObservable);

function multicast(subjectFactory) {
    return new _ConnectableObservable2['default'](this, subjectFactory);
}

;
module.exports = exports['default'];
//# sourceMappingURL=multicast.js.map