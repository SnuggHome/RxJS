'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = publish;

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

function subjectFactory() {
    return new _Subject2['default']();
}

function publish() {
    return this.multicast(subjectFactory);
}

module.exports = exports['default'];
//# sourceMappingURL=publish.js.map