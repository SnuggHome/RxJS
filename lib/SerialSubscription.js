'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Subscription2 = require('./Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var SerialSubscription = (function (_Subscription) {
    function SerialSubscription(subscription) {
        _classCallCheck(this, SerialSubscription);

        _Subscription.call(this, null, null);
        this.subscription = subscription;
    }

    _inherits(SerialSubscription, _Subscription);

    SerialSubscription.prototype.add = function add(subscription) {
        if (subscription) {
            if (this.unsubscribed) {
                subscription.unsubscribe();
            } else {
                var currentSubscription = this.subscription;
                this.subscription = subscription;
                if (currentSubscription) {
                    currentSubscription.unsubscribe();
                }
            }
        }
        return this;
    };

    SerialSubscription.prototype.remove = function remove(subscription) {
        if (this.subscription === subscription) {
            this.subscription = undefined;
        }
        return this;
    };

    SerialSubscription.prototype.unsubscribe = function unsubscribe() {
        _Subscription.prototype.unsubscribe.call(this);
        if (this.unsubscribed) {
            return;
        }
        this.unsubscribed = true;
        var subscription = this.subscription;
        if (subscription) {
            this.subscription = undefined;
            subscription.unsubscribe();
        }
    };

    return SerialSubscription;
})(_Subscription3['default']);

exports['default'] = SerialSubscription;
module.exports = exports['default'];
//# sourceMappingURL=SerialSubscription.js.map