define([
    "modules/sale/views/sale_view"
], function (SaleView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        shell = require("modules/shell/shell");

    // create module
    var sale = app.module(appInfo.moduleMap.sale.artifact, function () {
        this.startWithParent = false;
        this.render = function () {
            this.view = new SaleView();
            shell.view.mainRegion.show(this.view);
        };
    });

    sale.on("start", function () {
        this.render();
    });

    return sale;
});