define(function (require) {
    "use strict";

    // load external dependencies
    var Backbone = require("backbone"),
        Marionette = require("marionette"),
        appInfo = require("app_info"),
        util = require("utils/util");

    var Application = Marionette.Application.extend({
        removeAllInitializers: function () {
            this._initCallbacks = new Marionette.Callbacks();
        }
    }), app = new Application();

    app.addRegions({
        header: "#header",
        main: "#main",
        footer: "#footer"
    });

    app.on("initialize:before", function (options) {
        var location = window.location,
            isLogin = !!util.storage.get(appInfo.loginCookieKey),
            isLoginPage = location.pathname.indexOf(appInfo.module.login.url) != -1;
        if (isLogin) {
            if (isLoginPage) {
                app.removeAllInitializers();
                app.off();
                util.navigation.navigateTo(appInfo.module.index.url);
            } else {
                appInfo.loginInfo.update(util.storage.get(appInfo.loginCookieKey));
            }
        } else {
            if (!isLoginPage) {
                app.removeAllInitializers();
                app.off();
                util.navigation.navigateTo(appInfo.module.login.url);
            }
        }
    });

    app.on("initialize:after", function (options) {
        Backbone.history.start();
    });

    return app;
});
