//require.config({
//    urlArgs: "version=" + new Date().getTime()
//});
define(["modules/login/views/login_view"
], function (LoginView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        storageUtil = require("modules/api/utils/storage_util");

    // create module
    var login = app.module(appInfo.moduleMap.login.artifact, function () {
        this.startWithParent = false;
        this.render = function () {
            this.view = new LoginView();
            app.bodyRegion.show(this.view);
        };
    });

    login.on("start", function () {
        this.render();
    });

    login.on("login:succeed", function (userInfo) {
        var LoginInfo = appInfo.loginInfo.constructor;
        storageUtil.set(appInfo.loginCookieKey, new LoginInfo(userInfo, new Date().getTime()));
        app.vent.trigger("login:succeed");
    });

    return login;
});