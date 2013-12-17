define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/sale/views/sale_analysis.html");

    var SaleAnalysisView = Marionette.ItemView.extend({
        artifact: "sale",
        template: template
    });

    return SaleAnalysisView;
});