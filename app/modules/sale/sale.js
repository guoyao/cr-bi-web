define([
    "modules/sale/views/sale_view"
], function (SaleView) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        shell = app[appInfo.moduleMap.shell.artifact];

    // create module
    var sale = app.module(appInfo.moduleMap.sale.artifact, function () {
        this.startWithParent = false;
        this.render = function (options) {
            this.view = new SaleView(options);
            this.view.on("shown", function () {
                app.navigate(this.moduleName + "/" + this.view.view.artifact, {trigger: false});
            }, this);
            shell.trigger("show", {view: this.view});
        };
        this.navigate = function (options) {
            if (this.view) {
                this.view.navigate(options);
            }
        };
    });

    sale.on("start", function (options) {
        this.render(options);
    });

    return sale;
});