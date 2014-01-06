define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/sale/views/sale_analysis.html"),
        SaleAnalysisChart = require("modules/sale/components/sale_analysis_chart");

    var SaleAnalysisView = Marionette.ItemView.extend({
        artifact: "sale",
        template: template,
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
                var saleData = data["sale"];
                showTimeSeriesChart.call(that, saleData["time_series_datum"]);
                showClassGroupChart.call(that, saleData["class_group_datum"]);
                showCategoryChart.call(that, saleData["category_datum"]);
                showOperationChart.call(that, saleData["operation_datum"]);
                showDistrictChart.call(that, saleData["district_datum"]);
                showSupplierChart.call(that, saleData["supplier_datum"]);
            });
    }

    function showTimeSeriesChart(dataProvider) {
        new SaleAnalysisChart(this.ui.timeSeriesChart, dataProvider).render();
    }

    function showClassGroupChart(dataProvider) {
        new SaleAnalysisChart(this.ui.classGroupChart, dataProvider).render();
    }

    function showCategoryChart(dataProvider) {
        new SaleAnalysisChart(this.ui.categoryChart, dataProvider).render();
    }

    function showOperationChart(dataProvider) {
        new SaleAnalysisChart(this.ui.operationChart, dataProvider).render();
    }

    function showDistrictChart(dataProvider) {
        new SaleAnalysisChart(this.ui.districtChart, dataProvider).render();
    }

    function showSupplierChart(dataProvider) {
        new SaleAnalysisChart(this.ui.supplierChart, dataProvider).render();
    }

    return SaleAnalysisView;
});