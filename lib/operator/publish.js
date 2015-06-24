'use strict';

exports.__esModule = true;
exports['default'] = publish;

var _Subject = require('../Subject');

var _Subject2 = babelHelpers.interopRequireDefault(_Subject);

function subjectFactory() {
    return new _Subject2['default']();
}

function publish() {
    return this.multicast(subjectFactory);
}

module.exports = exports['default'];
//# sourceMappingURL=publish.js.map