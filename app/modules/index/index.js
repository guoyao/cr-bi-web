define([
    "modules/index/router",
    "modules/index/controller",
    "modules/index/views/index_view"
], function (Router, Controller, IndexView) {
    "use strict";

    var app = require("app"),
        shell = require("modules/shell/shell");

    // create module
    var index = app.module("index", function () {
        this.startWithParent = false;
        this.render = function () {
            this.view = new IndexView();
            shell.view.mainRegion.show(new IndexView());
        }
    });

    index.on("start", function () {
        new Router({controller: Controller});
        this.render();
    });

    return index;
});