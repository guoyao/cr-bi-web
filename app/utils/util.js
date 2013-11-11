define(function (require) {
    // load external dependencies
    var $ = require("jquery"),
        appInfo = require("app_info");

    /**
     * string util module
     */
    var string = (function ($) {
        function isBlank(value) {
            return $.trim(value).length === 0;
        }

        return {
            isBlank: isBlank
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
        function navigateTo(url, backable) {
            if (backable) {
                window.location.href = url;
            } else {
                window.location.replace(url);
            }
        }

        function forward() {
            window.history.forward();
        }

        function back() {
            window.history.back();
        }

        return {
            navigateTo: navigateTo,
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
     * app util module
     */
    var app = (function () {
        var LoginInfo = appInfo.loginInfo.constructor;

        function login(userInfo) {
            storage.set(appInfo.loginCookieKey, new LoginInfo(userInfo, new Date().getTime()));
            navigation.navigateTo(appInfo.module.index.url);
        }

        function logout() {
            storage.remove(appInfo.loginCookieKey);
            navigation.navigateTo(appInfo.module.login.url);
        }

        return {
            login: login,
            logout: logout
        };
    })();

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
        app: app,
        storage: storage,
        dateTime: dateTime
    };
});