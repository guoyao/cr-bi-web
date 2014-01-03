define(function (require) {
    // load external dependencies
    var util = require("utils/util"),
        ColumnChart = require("modules/api/components/charts/column_chart");

    var YearToDateComparisonChart = function ($element, dataProvider, options, globalOptions) {
        this.constructor.uper.constructor.call(this, $element, dataProvider, options, globalOptions);
    };

    util.clazz.inherits(YearToDateComparisonChart, ColumnChart);

    YearToDateComparisonChart.defaultOptions = {
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
    };

    return YearToDateComparisonChart;
});