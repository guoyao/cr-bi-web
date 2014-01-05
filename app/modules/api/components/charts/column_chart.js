define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        Class = require("modules/api/core/class"),
        Chart = require("modules/api/components/charts/chart");

    var ColumnChart = new Class(Chart, {
        initialize: function ($element, dataProvider, options, globalOptions) {
            ColumnChart.superclass.initialize.call(this, $element, dataProvider, options, globalOptions);
        },
        setDataProvider: function (dataProvider) {
            ColumnChart.superclass.setDataProvider.call(this, dataProvider);
            var xAxis = _.isArray(this.options.xAxis) ? this.options.xAxis : [this.options.xAxis];
            _.each(xAxis, function (axis) {
                if (axis.categoryField) {
                    axis.categories = _.map(dataProvider, function (data) {
                        return data[axis.categoryField];
                    });
                }
            });
            _.each(this.options.series, function (series) {
                if (series.dataField) {
                    series.data = _.map(dataProvider, function (data) {
                        return data[series.dataField];
                    });
                }
            }, this);

            return this;
        }
    });

    ColumnChart.defaultOptions = {
        chart: {
            type: 'column',
            borderWidth: 1,
            borderColor: '#d1d1d1'
        },
        yAxis: {
            min: 0
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}：</td>' +
                '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            series: {
                events: {
                    legendItemClick: function () {
                        return false;
                    }
                }
            }
        }
    };

    return ColumnChart;
});