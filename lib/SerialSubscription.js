'use strict';

exports.__esModule = true;

var _Subscription2 = require('./Subscription');

var _Subscription3 = babelHelpers.interopRequireDefault(_Subscription2);

var SerialSubscription = (function (_Subscription) {
    function SerialSubscription(subscription) {
        babelHelpers.classCallCheck(this, SerialSubscription);

        _Subscription.call(this, null, null);
        this.subscription = subscription;
    }

    babelHelpers.inherits(SerialSubscription, _Subscription);

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