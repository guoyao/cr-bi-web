define(function (require) {
    // load external dependencies
    var _ = require("underscore");

    var defaultOptions = {
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

    YearToDateComparisonChart.prototype.init = function () {
        _.each(this.options.series, function (series) {
            series.data = _.map(this.dataProvider, function (data) {
                return data[series.dataField];
            });
        }, this);

        return this;
    };

    YearToDateComparisonChart.prototype.render = function () {
        this.$element.highcharts(this.options);
        return this;
    };

    return YearToDateComparisonChart;
});