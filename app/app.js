define(function (require) {
    "use strict";

    // load external dependencies
    var Backbone = require("backbone"),
        Marionette = require("marionette"),
        appInfo = require("app_info");

    var app = new Marionette.Application();

    app.addRegions({
        bodyRegion: "body"
    });

    app.on("initialize:before", function () {
        this.router = new Marionette.AppRouter();
        this.navigate = function (fragment, options) {
            options = options || {trigger: true};
            this.router.navigate(fragment, options);
        };
        var isLogin = appInfo.isLogin();
        app.vent.trigger(isLogin ? "login:succeed" : "logout");
    });

    app.on("initialize:after", function () {
        Backbone.history.start();
    });

    app.vent.on("login:succeed", function () {
        var loginModule = app[appInfo.moduleMap.login.artifact];
        if (loginModule) {
            loginModule.stop();
        }
        appInfo.loginInfo.update();
        require([appInfo.moduleMap.shell.path], function (shellModule) {
            shellModule.start();
        });
    });

    app.vent.on("logout", function () {
        var shellModule = app[appInfo.moduleMap.shell.artifact];
        if (shellModule) {
            shellModule.stop();
        }
        require([appInfo.moduleMap.login.path], function (loginModule) {
            loginModule.start();
        });
    });

    return app;
});
