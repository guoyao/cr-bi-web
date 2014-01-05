define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        Class = require("modules/api/core/class"),
        ColumnChart = require("modules/api/components/charts/column_chart");

    var YearToDateComparisonChart = new Class(ColumnChart, {
        initialize: function ($element, dataProvider, options, globalOptions) {
            YearToDateComparisonChart.superclass.initialize.call(this, $element, dataProvider, options, globalOptions);
        }
    });

    YearToDateComparisonChart.defaultOptions = _.extend({}, YearToDateComparisonChart.superclass.constructor.defaultOptions, {
        legend: {
            enabled: false
        },
        xAxis: {
            categories: [""],
            labels: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                enabled: false
            },
            labels: {
                enabled: false
            }
        }
    });

    return YearToDateComparisonChart;
});