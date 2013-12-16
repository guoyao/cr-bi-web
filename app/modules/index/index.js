define([
    "modules/index/router",
    "modules/index/controller",
    "modules/index/views/index_view"
], function (Router, controller, IndexView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        shell = require("modules/shell/shell");

    // create module
    var index = app.module(appInfo.moduleMap.index.artifact, function () {
        this.startWithParent = false;
        this.router = new Router({controller: controller});
        this.render = function () {
            this.view = new IndexView();
            shell.view.mainRegion.show(this.view);
        };
    });

    index.on("start", function () {
        this.render();
    });

    return index;
});