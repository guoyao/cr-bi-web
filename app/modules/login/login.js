//require.config({
//    urlArgs: "version=" + new Date().getTime()
//});
define([
    "modules/aggregation",
    "modules/login/router",
    "modules/login/controller",
    "modules/login/views/login_view"
], function (aggregation, Router, Controller, LoginView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        util = require("utils/util");

    // create module
    var login = app.module("login", function () {
        this.startWithParent = false;
        this.render = function () {
            app.bodyRegion.show(new LoginView());
        }
    });

    login.on("start", function () {
        new Router({controller: Controller});
        this.render();
    });

    login.on("login:succeed", function (userInfo) {
        var LoginInfo = appInfo.loginInfo.constructor;
        util.storage.set(appInfo.loginCookieKey, new LoginInfo(userInfo, new Date().getTime()));
        app.vent.trigger("login:succeed");
    });

    return login;
});