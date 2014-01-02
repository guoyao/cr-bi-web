define(function (require) {
    var _ = require("underscore"),
        defaultOptions = {
            legend: {
                enabled: false
            },
            yAxis: {
                title: {
                    enabled: false
                },
                labels: {
                    enabled: false
                }
            }
        },
        YearToDateComparisonChart = function ($element, dataProvider, globalOptions, options) {
            this.$element = $element;
            this.dataProvider = dataProvider;
            this.options = _.extend({}, globalOptions, defaultOptions, options);
        };

    YearToDateComparisonChart.prototype.render = function () {
        this.$element.highcharts(this.options);
    };

    return YearToDateComparisonChart;
});