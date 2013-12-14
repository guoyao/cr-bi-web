define([
    "modules/index/router",
    "modules/index/controller",
    "modules/index/views/index_view"
], function (Router, Controller, IndexView) {
    "use strict";

    var app = require("app"),
        appInfo = require("app_info"),
        shell = require("modules/shell/shell");

    // create module
    var index = app.module(appInfo.moduleMap.index.artifact, function () {
        this.startWithParent = false;
        this.render = function () {
            this.view = new IndexView();
            shell.view.mainRegion.show(this.view);
        };
    });

    index.on("start", function () {
        new Router({controller: Controller});
        this.render();
    });

    return index;
});