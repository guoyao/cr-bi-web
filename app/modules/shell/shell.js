// merge dependencies to single file
define([
    "modules/shell/router",
    "modules/shell/controller",
    "modules/shell/views/shell_view",
    "modules/shell/history_patch_ie"
], function (Router, controller, ShellView, historyPatchIE) {
    "use strict";

    // load external dependencies
    var gui = require("gui"),
        app = require("app"),
        appInfo = require("app_info"),
        storageUtil = require("modules/api/utils/storage_util");

    // create module
    var shell = app.module(appInfo.moduleMap.shell.artifact, function () {
        this.startWithParent = false;
        this.router = new Router({controller: controller});
        this.render = function () {
            var hash = window.location.hash;
            appInfo.isInAdminSection = hash && hash.indexOf(appInfo.moduleMap.admin.name) != -1;
            this.view = new ShellView();
            this.view.on("shown", function () {
                if (hash) {
                    if (gui.browserInfo.isIE && gui.browserInfo.version <= 7) {
                        historyPatchIE.navigate(hash);
                    } else {
                        app.navigate("", {trigger: false});
                        app.navigate(hash.replace("#", ""));
                    }
                } else {
                    app.navigate(appInfo.defaultModule.hash);
                }
            });
            app.bodyRegion.show(this.view);
        };
    });

    shell.on("start", function () {
        historyPatchIE.start();
        this.render();
    });

    shell.on("logout", function () {
        storageUtil.remove(appInfo.loginCookieKey);
        historyPatchIE.stop();
        app.vent.trigger("logout");
    });

    // root view of module shown handler
    shell.on("module.shown", function (options) {
        if (this.view && options && options.view) {
            if (options.view.disableGlobalQuery) {
                this.view.ui.globalQueryContainer.hide();
            } else {
                this.view.ui.globalQueryContainer.show();
            }
            this.view.moduleRegion.show(options.view);
        }
        this.view.switchNav();
    });

    // sub view of module root view shown handler
    shell.on("view.shown", function (options) {
        if (this.view && options) {
            if (options.disableGlobalQuery) {
                this.view.ui.globalQueryContainer.hide();
            } else {
                this.view.ui.globalQueryContainer.show();
            }
        }
    });

    return shell;
});