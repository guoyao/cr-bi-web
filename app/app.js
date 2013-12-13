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
        var isLogin = appInfo.isLogin();
        app.vent.trigger(isLogin ? "login:succeed" : "logout");
    });

    app.on("initialize:after", function () {
        Backbone.history.start();
    });

    app.vent.on("login:succeed", function () {
        appInfo.loginInfo.update();
        require([appInfo.moduleMap.shell.path], function (shellModule) {
            shellModule._isInitialized ? shellModule.render() : shellModule.start();
        });
    });

    app.vent.on("logout", function () {
        require([appInfo.moduleMap.login.path], function (loginModule) {
            loginModule._isInitialized ? loginModule.render() : loginModule.start();
        });
    });

    return app;
});
