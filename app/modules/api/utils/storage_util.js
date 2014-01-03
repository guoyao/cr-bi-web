define(function (require) {
    // load external dependencies
    var $ = require("jquery");

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

    return (function (storageMedium) {
        return {
            get: storageMedium.get,
            set: storageMedium.set,
            remove: storageMedium.remove
        };
    })(cookie);
});