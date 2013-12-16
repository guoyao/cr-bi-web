define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/sale/views/sale_analysis.html");

    var SaleAnalysisView = Marionette.ItemView.extend({
        template: template
    });

    return SaleAnalysisView;
});