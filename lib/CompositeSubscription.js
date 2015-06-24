'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Subscription2 = require('./Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var _utilArraySlice = require('./util/arraySlice');

var _utilArraySlice2 = _interopRequireDefault(_utilArraySlice);

var CompositeSubscription = (function (_Subscription) {
    function CompositeSubscription() {
        _classCallCheck(this, CompositeSubscription);

        _Subscription.call(this, null, null);
        this.length = 0;
    }

    _inherits(CompositeSubscription, _Subscription);

    CompositeSubscription.from = function from(subscriptions) {
        var comp = new CompositeSubscription();
        if (Array.isArray(subscriptions)) {
            subscriptions.forEach(function (sub) {
                return comp.add(sub);
            });
        }
        return comp;
    };

    CompositeSubscription.prototype.unsubscribe = function unsubscribe() {
        if (this.unsubscribed || !this._subscriptions) {
            return;
        }
        this.unsubscribed = true;
        var subscriptions = _utilArraySlice2['default'](this._subscriptions);
        var subscriptionCount = subscriptions && subscriptions.length || 0;
        var subscriptionIndex = -1;
        this._subscriptions = undefined;
        while (++subscriptionIndex < subscriptionCount) {
            subscriptions[subscriptionIndex].unsubscribe();
        }
    };

    CompositeSubscription.prototype.add = function add(subscription) {
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        if (subscription && !subscription.unsubscribed) {
            if (this.unsubscribed) {
                subscription.unsubscribe();
            } else {
                subscriptions.push(subscription);
            }
        }
        this.length = subscriptions.length;
        return this;
    };

    CompositeSubscription.prototype.remove = function remove(subscription) {
        var unsubscribed = this.unsubscribed;
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
            this.length = subscriptions.length;
        } else {
            this.length = 0;
        }
        return this;
    };

    CompositeSubscription.prototype.indexOf = function indexOf(subscription) {
        return this._subscriptions.indexOf(subscription);
    };

    return CompositeSubscription;
})(_Subscription3['default']);

exports['default'] = CompositeSubscription;
module.exports = exports['default'];
//# sourceMappingURL=CompositeSubscription.js.map