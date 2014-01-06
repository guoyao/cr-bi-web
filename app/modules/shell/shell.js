// merge dependencies to single file
define([
    "modules/shell/router",
    "modules/shell/controller",
    "modules/shell/views/shell_view"
], function (Router, controller, ShellView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        storageUtil = require("modules/api/utils/storage_util");

    // create module
    var shell = app.module(appInfo.moduleMap.shell.artifact, function () {
        this.startWithParent = false;
        this.router = new Router({controller: controller});
        this.render = function () {
            this.view = new ShellView();
            this.view.on("shown", function () {
                var hash = window.location.hash;
                if (hash) {
                    app.navigate("", {trigger: false});
                    app.navigate(hash.replace("#", ""));
                } else {
                    app.navigate(appInfo.defaultModule.hash);
                }
            });
            app.bodyRegion.show(this.view);
        };
    });

    shell.on("start", function () {
        this.render();
    });

    shell.on("logout", function () {
        storageUtil.remove(appInfo.loginCookieKey);
        app.vent.trigger("logout");
    });

    // show module root view
    shell.on("show", function (options) {
        if (this.view && options && options.view) {
            this.view.moduleRegion.show(options.view);
        }
    });

    return shell;
});