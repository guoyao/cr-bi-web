define(function (require) {

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/sale/views/sale.html"),
        SaleAnalysisView = require("modules/sale/views/sale_analysis_view"),
        ProfitAnalysisView = require("modules/sale/views/profit_analysis_view");

    var SaleView = Marionette.Layout.extend({
        template: template,
        regions: {
            bodyRegion: "#module-body"
        },
        onShow: function () {
            this.bodyRegion.show(new SaleAnalysisView());
        }
    });

    return SaleView;
});