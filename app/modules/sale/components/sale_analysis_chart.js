define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        Class = require("modules/api/core/class"),
        ColumnChart = require("modules/api/components/charts/column_chart");

    var SaleAnalysisChart = new Class(ColumnChart, {
        initialize: function ($element, dataProvider, options, globalOptions) {
            SaleAnalysisChart.superclass.initialize.call(this, $element, dataProvider, options, globalOptions);
        }
    });

    SaleAnalysisChart.defaultOptions = _.extend({}, SaleAnalysisChart.superclass.constructor.defaultOptions, {
        title: {
            text: '零售客单价&客单数趋势'
        },
        yAxis: [{
            min: 0,
            title: {
                text: "万元"
            }
        }, {
            min: 0,
            title: {
                text: "万次"
            },
            opposite: true
        }],
        xAxis: {
            categoryField: "date"
        },
        series: [
            {
                name: '零售额',
                dataField: "retail_sale"
            },
            {
                name: '上年同期零售额',
                dataField: "corresponding_period_retail_sale"
            },
            {
                type: "spline",
                name: '客单数',
                yAxis: 1,
                lineWidth: 3,
                dataField: "guest_amount",
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[2],
                    fillColor: 'white'
                }
            },
            {
                type: "spline",
                name: '上年同期客单数',
                yAxis: 1,
                lineWidth: 3,
                dataField: "corresponding_period_guest_amount",
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }
        ]
    });

    return SaleAnalysisChart;
});