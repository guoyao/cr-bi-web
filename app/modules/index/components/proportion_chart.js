define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        classUtil = require("modules/api/utils/class_util"),
        PieChart = require("modules/api/components/charts/pie_chart");

    var ProportionChart = function ($element, dataProvider, options, globalOptions) {
        ProportionChart.uper.constructor.call(this, $element, dataProvider, options, globalOptions);
    };

    classUtil.inherits(ProportionChart, PieChart);

    ProportionChart.defaultOptions = _.extend({}, ProportionChart.uper.constructor.defaultOptions, {
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