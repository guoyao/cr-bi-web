// merge dependencies to single file
define([
    "modules/aggregation",
    "modules/shell/views/shell_view"
], function (aggregation, ShellView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        util = require("utils/util");

    // create module
    var shell = app.module("shell", function () {
        this.startWithParent = false;
        this.render = function () {
            app.bodyRegion.show(new ShellView());
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