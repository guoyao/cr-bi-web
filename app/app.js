define(function (require) {
    "use strict";

    // load external dependencies
    var Backbone = require("backbone"),
        Marionette = require("marionette"),
        gui = require("gui"),
        appInfo = require("app_info");

    var app = new Marionette.Application();

    app.addRegions({
        bodyRegion: "body"
    });

    app.on("initialize:before", function () {
        this.currentModule = null; // current showing module
        this.router = new Marionette.AppRouter();
        this.navigate = function (fragment, options) {
            options = options || {trigger: true};
            this.router.navigate(fragment, options);
            if (gui.browserInfo.isIE && gui.browserInfo.version <= 7) {
                window.location.hash = fragment;
            }
        };
        app.vent.trigger(appInfo.isLogin() ? "login:succeed" : "logout");
    });

    app.on("initialize:after", function () {
        if (gui.browserInfo.isIE && gui.browserInfo.version <= 7) {
            return;
        }
        Backbone.history.start();
    });

    app.vent.on("login:succeed", function () {
        var loginModule = app[appInfo.moduleMap.login.artifact];
        if (loginModule) {
            loginModule.stop();
        }
        appInfo.loginInfo.update();
        require([appInfo.moduleMap.api.path, appInfo.moduleMap.shell.path], function (api, shellModule) {
            shellModule.start();
        });
    });

    app.vent.on("logout", function () {
        var shellModule = app[appInfo.moduleMap.shell.artifact];
        if (shellModule) {
            shellModule.stop();
        }
        app.currentModule = null;
        require([appInfo.moduleMap.login.path], function (loginModule) {
            loginModule.start();
        });
    });

    return app;
});
