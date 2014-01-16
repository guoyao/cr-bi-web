define([
    "modules/index/views/index_view"
], function (IndexView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        shell = app[appInfo.moduleMap.shell.artifact];

    // create module
    var index = app.module(appInfo.moduleMap.index.artifact, function () {
        this.startWithParent = false;
        this.render = function () {
            this.view = new IndexView();
            shell.trigger("module.shown", {view: this.view});
            this.navigate();
        };
        this.navigate = function () {
            app.navigate(this.moduleName, {trigger: false});
        };
    });

    index.on("start", function () {
        this.render();
    });

    return index;
});