define(['exports', 'module', '../util/tryCatch', '../util/errorObject', '../Observable', '../Subscription', '../CompositeSubscription', './fromEventPattern'], function (exports, module, _utilTryCatch, _utilErrorObject, _Observable2, _Subscription, _CompositeSubscription, _fromEventPattern) {
    /**
     * Creates an observable sequence by adding an event listener to the matching DOMElement or each item in the NodeList.
     *
     * @example
     *   var source = Rx.Observable.fromEvent(element, 'mouseup');
     *
     * @param {any} element The DOMElement or NodeList to attach a listener.
     * @param {string} eventName The event name to attach the observable sequence.
     * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
     * @returns {Observable} An observable sequence of events from the specified element and the specified event.
     */
    'use strict';

    module.exports = fromEvent;

    function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var _try_catch = _interopRequire(_utilTryCatch);

    var _error_obj = _interopRequire(_utilErrorObject);

    var _Observable3 = _interopRequire(_Observable2);

    var _Subscription2 = _interopRequire(_Subscription);

    var _CompositeSubscription2 = _interopRequire(_CompositeSubscription);

    var _fromEventPattern2 = _interopRequire(_fromEventPattern);

    var EventListenerObservable = (function (_Observable) {
        function EventListenerObservable(element, eventName, selector) {
            _classCallCheck(this, EventListenerObservable);

            _Observable.call(this, null);
            this.element = element;
            this.eventName = eventName;
            this.selector = selector;
        }

        _inherits(EventListenerObservable, _Observable);

        EventListenerObservable.prototype.subscriber = function subscriber(observer) {
            var selector = this.selector;
            var listeners = createEventListener(this.element, this.eventName, function handler(e) {
                var result = e;
                var iteratorResult;
                if (selector) {
                    result = _try_catch(selector).apply(this, arguments);
                    if (result === _error_obj) {
                        observer['throw'](_error_obj.e);
                        listeners.unsubscribe();
                        return;
                    }
                }
                iteratorResult = observer.next(result);
                if (iteratorResult.done) {
                    listeners.unsubscribe();
                }
            }, observer);
            return listeners;
        };

        return EventListenerObservable;
    })(_Observable3);

    function createListener(element, name, handler, observer) {
        if (element.addEventListener) {
            element.addEventListener(name, handler, false);
            return new _Subscription2(function () {
                element.removeEventListener(name, handler, false);
            }, observer);
        }
        throw new Error('No listener found.');
    }
    function createEventListener(element, eventName, handler, observer) {
        var subscriptions = new _CompositeSubscription2();
        // Asume NodeList
        if (Object.prototype.toString.call(element) === '[object NodeList]') {
            for (var i = 0, len = element.length; i < len; i++) {
                subscriptions.add(createEventListener(element.item(i), eventName, handler, observer));
            }
        } else if (element) {
            subscriptions.add(createListener(element, eventName, handler, observer));
        }
        return subscriptions;
    }
    function fromEvent(element, eventName) {
        var selector = arguments[2] === undefined ? null : arguments[2];

        // Node.js specific
        if (element.addListener) {
            return _fromEventPattern2(function (h) {
                element.addListener(eventName, h);
            }, function (h) {
                element.removeListener(eventName, h);
            }, selector);
        }
        var config = this.config || {};
        // Use only if non-native events are allowed
        if (!config.useNativeEvents) {
            // Handles jq, Angular.js, Zepto, Marionette, Ember.js
            if (typeof element.on === 'function' && typeof element.off === 'function') {
                return _fromEventPattern2(function (h) {
                    element.on(eventName, h);
                }, function (h) {
                    element.off(eventName, h);
                }, selector);
            }
        }
        return new EventListenerObservable(element, eventName, selector);
    }

    ;
});