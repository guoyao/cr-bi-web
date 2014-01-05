define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        Class = require("modules/api/core/class"),
        Chart = require("modules/api/components/charts/chart");

    var PieChart = new Class(Chart, {
        initialize: function ($element, dataProvider, options, globalOptions) {
            PieChart.superclass.initialize.call(this, $element, dataProvider, options, globalOptions);
        },
        setDataProvider: function (dataProvider) {
            PieChart.superclass.setDataProvider.call(this, dataProvider);
            _.each(this.options.series, function (series) {
                if (series.dataField) {
                    series.data = _.map(dataProvider, function (data) {
                        return [series.nameField ? data[series.nameField] : "", data[series.dataField]];
                    });
                }
            }, this);

            return this;
        }
    });

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

    return PieChart;
});