define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        classUtil = require("modules/api/utils/class_util"),
        ColumnChart = require("modules/api/components/charts/column_chart");

    var YearToDateComparisonChart = function ($element, dataProvider, options, globalOptions) {
        YearToDateComparisonChart.uper.constructor.call(this, $element, dataProvider, options, globalOptions);
    };

    classUtil.inherits(YearToDateComparisonChart, ColumnChart);

    YearToDateComparisonChart.defaultOptions = _.extend({}, YearToDateComparisonChart.uper.constructor.defaultOptions, {
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