define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        Class = require("modules/api/core/class"),
        PieChart = require("modules/api/components/charts/pie_chart");

    var ProportionChart = new Class(PieChart, {
        initialize: function ($element, dataProvider, options, globalOptions) {
            ProportionChart.superclass.initialize.call(this, $element, dataProvider, options, globalOptions);
        }
    });

    ProportionChart.defaultOptions = _.extend({}, ProportionChart.superclass.constructor.defaultOptions, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            marginRight: 115
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        }
    });

    return ProportionChart;
});