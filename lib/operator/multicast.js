'use strict';

exports.__esModule = true;
exports['default'] = multicast;

var _ConnectableObservable = require('../ConnectableObservable');

var _ConnectableObservable2 = babelHelpers.interopRequireDefault(_ConnectableObservable);

function multicast(subjectFactory) {
    return new _ConnectableObservable2['default'](this, subjectFactory);
}

;
module.exports = exports['default'];
//# sourceMappingURL=multicast.js.map