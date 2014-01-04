define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        classUtil = require("modules/api/utils/class_util"),
        Chart = require("modules/api/components/charts/chart");

    var PieChart = function ($element, dataProvider, options, globalOptions) {
        PieChart.uper.constructor.call(this, $element, dataProvider, options, globalOptions);
    };

    classUtil.inherits(PieChart, Chart);

    PieChart.defaultOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            },
            series: {
                point: {
                    events: {
                        legendItemClick: function () {
                            return false;
                        }
                    }
                }
            }
        }
    };

    PieChart.prototype.setDataProvider = function (dataProvider) {
        PieChart.uper.setDataProvider.call(this, dataProvider);
        _.each(this.options.series, function (series) {
            if (series.dataField) {
                series.data = _.map(dataProvider, function (data) {
                    return [series.nameField ? data[series.nameField] : "", data[series.dataField]];
                });
            }
        }, this);

        return this;
    };

    return PieChart;
});