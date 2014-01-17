define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/sale/views/sale_analysis.html"),
        SaleAnalysisChart = require("modules/sale/components/sale_analysis_chart");

    var artifact = "sale";

    var SaleAnalysisView = Marionette.ItemView.extend({
        artifact: artifact,
        template: template,
        id: artifact + "View",
        ui: {
            timeSeriesChart: ".time-series-chart",
            classGroupChart: ".class-group-chart",
            categoryChart: ".category-chart",
            operationChart: ".operation-chart",
            districtChart: ".district-chart",
            supplierChart: ".supplier-chart"
        },
        onShow: function () {
            fetchDatum.call(this);
        }
    });

    function fetchDatum() {
        var that = this;
        $.getJSON("assets/data/sale.json")
            .done(function (data) {
                showChart.call(that, data["sale"]);
            });
    }

    function showChart(saleData) {
        new SaleAnalysisChart(this.ui.timeSeriesChart, saleData["time_series_datum"]).render();
        new SaleAnalysisChart(this.ui.classGroupChart, saleData["class_group_datum"]).render();
        new SaleAnalysisChart(this.ui.categoryChart, saleData["category_datum"]).render();
        new SaleAnalysisChart(this.ui.operationChart, saleData["operation_datum"]).render();
        new SaleAnalysisChart(this.ui.districtChart, saleData["district_datum"]).render();
        new SaleAnalysisChart(this.ui.supplierChart, saleData["supplier_datum"]).render();
    }

    return SaleAnalysisView;
});