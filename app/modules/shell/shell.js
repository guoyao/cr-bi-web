// merge dependencies to single file
define([
    "modules/shell/views/shell_view"
], function (ShellView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        util = require("utils/util");

    // create module
    var shell = app.module("shell", function () {
        this.startWithParent = false;
        this.render = function () {
            this.view = new ShellView();
            app.bodyRegion.show(this.view);
        }
    });

    shell.on("start", function () {
        this.render();
    });

    shell.on("logout", function () {
        util.storage.remove(appInfo.loginCookieKey);
        app.vent.trigger("logout");
    });

    return shell;
});