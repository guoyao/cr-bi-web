define([
    "modules/shell/shell",
    "modules/index/router",
    "modules/index/controller",
    "modules/index/views/index_view"
], function (shell, Router, Controller, IndexView) {
    "use strict";

    // create module
    var index = shell.module("index", {startWithParent: false});

    index.on("start", function () {
        new Router({controller: Controller});
        shell.mainRegion.show(new IndexView());
    });

    return index;
});