define([
    "modules/admin/views/admin_view"
], function (AdminView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        shell = app[appInfo.moduleMap.shell.artifact];

    // create module
    var admin = app.module(appInfo.moduleMap.admin.artifact, function () {
        this.startWithParent = false;
        this.render = function (options) {
            this.view = new AdminView(options);
            this.view.on("shown", function () {
                app.navigate(this.moduleName + "/" + this.view.view.artifact, {trigger: false});
                shell.trigger("view.shown", {disableGlobalQuery: this.view.disableGlobalQuery || this.view.view.disableGlobalQuery});
            }, this);
            shell.trigger("module.shown", {view: this.view});
        };
        this.navigate = function (options) {
            if (this.view) {
                this.view.navigate(options);
            }
        };
    });

    admin.on("start", function (options) {
        this.render(options);
    });

    return admin;
});