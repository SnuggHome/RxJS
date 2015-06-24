'use strict';

exports.__esModule = true;
exports['default'] = zip;

var _Observable = require('../Observable');

var _Observable2 = babelHelpers.interopRequireDefault(_Observable);

function zip(observables, project) {
    return _Observable2['default'].zip([this].concat(observables), project);
}

module.exports = exports['default'];
//# sourceMappingURL=zip.js.map