define(function (require) {
    // load external dependencies
    var $ = require("jquery");

    /**
     * string util module
     */
    var string = (function ($) {
        function isBlank(value) {
            return $.trim(value).length === 0;
        }

        function substitute(value) {
            if (value) {
                var args = arguments,
                    pattern = new RegExp("{([0-" + (arguments.length - 2) + "])}", "g");

                return value.replace(pattern, function (match, index) {
                    return  args[parseInt(index, 10) + 1];
                });
            }

            return value;
        }

        return {
            isBlank: isBlank,
            substitute: substitute
        };
    })($);

    /**
     * Array util module
     */
    var array = (function ($) {
        function isArray(value) {
            return $.isArray(value);
        }

        return {
            isArray: isArray
        };
    })($);

    /**
     * navigation util module
     */
    var navigation = (function (window) {
        function forward() {
            window.history.forward();
        }

        function back() {
            window.history.back();
        }

        return {
            forward: forward,
            back: back
        };
    })(window);

    // storage medium one: implement by cookie
    var cookie = (function ($) {
        return {
            get: function (key, value, options) {
                return $.cookie(key, value, options);
            },
            set: function (key, value, options) {
                return $.cookie(key, value, options);
            },
            remove: function (key, options) {
                return $.removeCookie(key, options);
            }
        }
    })($);

    /**
     * storage util module
     */
    var storage = (function (storageMedium) {
        return {
            get: storageMedium.get,
            set: storageMedium.set,
            remove: storageMedium.remove
        };
    })(cookie);

    /**
     * date util module
     */
    var dateTime = (function () {
        function toPretty(value) {
            return value >= 10 ? value.toString() : "0" + value;
        }
        return {
            MILLSECONDS_OF_SECOND: 1000,
            MILLSECONDS_OF_MINUTE: 60 * 1000,
            MILLSECONDS_OF_HOUR: 3600 * 1000,
            toPretty: toPretty
        };
    })();


    return {
        string: string,
        array: array,
        navigation: navigation,
        storage: storage,
        dateTime: dateTime
    };
});