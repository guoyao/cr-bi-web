define(function (require) {
    "use strict";

    // load external dependencies
    var $ = require("jquery"),
        _ = require("underscore"),
        numeral = require("numeral"),
        Marionette = require("marionette"),
        gui = require("gui"),
        appInfo = require("app_info"),
        util = require("utils/util"),
        template = require("text!templates/index/index.html");

    var climateKeyWords = [
        {key: "n/a", value: "weather_not_available.png"},
        {key: "default", value: "weather_default.png"},
        {key: "阴", value: "weather_overcast.png"},
        {key: "云", value: "weather_cloudy.png"},
        {key: "雨", value: "weather_rainy.png"},
        {key: "雪", value: "weather_snowy.png"},
        {key: "雷", value: "weather_thundery.png"},
        {key: "雾", value: "weather_mist.png"},
        {key: "晴", value: "weather_sunny.png"}
    ];

    var IndexView = Marionette.ItemView.extend({
        template: template,
        id: appInfo.moduleMap.index.name + "-module",
        ui: {
            username: "#username",
            position: "#position",
            permission: "#permission",
            today: "#today",
            todayOfLastYear: "#todayOfLastYear",
            city: "#city",
            temperature: "#temperature",
            humidity: "#humidity",
            wind: "#wind",
            climateImage: "#climateImage",
            sellReportMainKpiTable: "#sellReportMainKpiTable",
            yearToDateSaleChart: "#yearToDateSaleChart",
            yearToDateProfitChart: "#yearToDateProfitChart",
            yearToDateQuantityChart: "#yearToDateQuantityChart",
            systemMessageTable: "#systemMessageTable",
            retailSaleTrendChart: "#retailSaleTrendChart",
            retailSaleTrendTable: "#retailSaleTrendTable",
            yearToDateOperationProportionChart: "#yearToDateOperationProportionChart",
            lastYearOperationProportionChart: "#lastYearOperationProportionChart",
            yearToDateDistrictProportionChart: "#yearToDateDistrictProportionChart",
            lastYearDistrictProportionChart: "#lastYearDistrictProportionChart",
            yearToDateRetailProportionChart: "#yearToDateRetailProportionChart",
            lastYearRetailProportionChart: "#lastYearRetailProportionChart",
            yearToDateRetailProportionTable: "#yearToDateRetailProportionTable",
            lastYearRetailProportionTable: "#lastYearRetailProportionTable"
        },
        onRender: function () {
            showDateInfo.call(this);
            showWeatherInfo.call(this);
        },
        onShow: function () {
            var chartWidth = (this.ui.yearToDateSaleChart.parent().width() - this.ui.yearToDateSaleChart.pixels('margin-right') * 2) / 3;
            this.ui.yearToDateSaleChart.width(chartWidth);
            this.ui.yearToDateProfitChart.width(chartWidth);
            this.ui.yearToDateQuantityChart.width(chartWidth);
            iePatch.call(this);
            showYearToDateComparisonChart.call(this);
            showRetailSaleTrendChart.call(this);
            showProportionChart.call(this);
            showFakeDatum.call(this);
        }
    });

    function showDateInfo() {
        var today = new Date(),
            todayOfLastYear = new Date(today.getTime()),
            lunarUtil = util.dateTime.lunar,
            todayLunarInfos = lunarUtil.toLunar(today),
            todayOfLastYearLunarInfos;

        todayOfLastYear.setYear(today.getFullYear() - 1);
        todayOfLastYearLunarInfos = lunarUtil.toLunar(todayOfLastYear);
        this.ui.username.text(appInfo.loginInfo.userInfo.username);
        this.ui.position.text(appInfo.loginInfo.userInfo.position);
        this.ui.permission.text(appInfo.loginInfo.userInfo.permission);
        this.ui.today.text(util.string.substitute("{0}（{1} 农历{2}{3}）",
            $.format.date(today, "yyyy年MM月dd日"),
            lunarUtil.getChineseDay(today.getDay()),
            lunarUtil.getChineseMonth(todayLunarInfos[1]),
            lunarUtil.getChineseDate(todayLunarInfos[2])));
        this.ui.todayOfLastYear.text(util.string.substitute("{0}（{1} 农历{2}{3}）",
            $.format.date(todayOfLastYear, "yyyy年MM月dd日"),
            lunarUtil.getChineseDay(todayOfLastYear.getDay()),
            lunarUtil.getChineseMonth(todayOfLastYearLunarInfos[1]),
            lunarUtil.getChineseDate(todayOfLastYearLunarInfos[2])));
    }

    function showFakeDatum() {
        var that = this;
        $.getJSON("assets/data/index.json")
            .done(function (data) {
                var sellReportMainKpiDatum = data["sell_report_main_kpi_datum"],
                    retailSaleTrendDatum = data["retail_sale_trend_datum"],
                    yearToDateRetailProportionDatum = data["year_to_date_retail_proportion_datum"],
                    lastYearRetailProportionDatum = data["last_year_retail_proportion_datum"],
                    tableWidth = that.ui.systemMessageTable.parent().width();
                that.ui.sellReportMainKpiTable.find("td span").each(function (index) {
                    var $this = $(this),
                        text = $this.text();
                    if (text == "万元" || text == "万次") {
                        $this.text(numeral(sellReportMainKpiDatum[index] / 10000).format("0,0") + text);
                    } else if (text == "%" || text == "元") {
                        $this.text(numeral(sellReportMainKpiDatum[index]).format("0,0.00") + text);
                    } else {
                        $this.text(numeral(sellReportMainKpiDatum[index]).format("0,0") + text);
                    }
                });
                that.ui.systemMessageTable.flexigrid({
                    dataType: 'json',
                    height: 310,
                    colModel: [
                        { display: '消息内容', name: 'message', sortable: true, width: tableWidth - 60 - 5 * 4 - 4 - 18, align: 'left' },
                        { display: '日期', name: 'date', sortable: true, width: 60, align: 'center' }
                    ]
                });
                that.ui.systemMessageTable.flexAddData(data["system_messages"]);
                that.ui.retailSaleTrendTable.find("td.text-primary").each(function (index) {
                    var $this = $(this);
                    $this.text(retailSaleTrendDatum[index] + $this.text());
                });
                that.ui.yearToDateRetailProportionTable.find("td span").each(function (index) {
                    var $this = $(this);
                    $this.text(numeral(yearToDateRetailProportionDatum[index]).format("0,0.00") + $this.text());
                });
                that.ui.lastYearRetailProportionTable.find("td span").each(function (index) {
                    var $this = $(this);
                    $this.text(numeral(lastYearRetailProportionDatum[index]).format("0,0.00") + $this.text());
                });
            });
    }

    function showWeatherInfo() {
        var that = this;
        $.getJSON(appInfo.properties.weatherServiceURL + "?callback=?")
            .done(function (data) {
                var i,
                    length,
                    climate,
                    realWeatherInfo,
                    climateImageUrl = appInfo.properties.imageRoot + climateKeyWords[1].value;
                if (util.array.isArray(data)) {
                    if (data.length > 0 && data[0].search('维护') > -1) { // 天气信息服务维护中
                        that.ui.climateImage.attr("src", appInfo.properties.imageRoot + climateKeyWords[0].value);
                        return;
                    }
                    if (data.length > 1) {
                        that.ui.city.text(data[1]);
                    }
                    if (data.length > 6) {
                        climate = data[6];
                        if (!util.string.isBlank(climate)) {
                            for (i = 2, length = climateKeyWords.length; i < length; i++) {
                                if (climate.search(climateKeyWords[i].key) > -1) {
                                    climateImageUrl = appInfo.properties.imageRoot + climateKeyWords[i].value;
                                    break;
                                }
                            }
                        } else {
                            climateImageUrl = appInfo.properties.imageRoot + climateKeyWords[0].value;
                        }
                    }
                    if (data.length > 10) {
                        realWeatherInfo = data[10].match(/(气温[^；]+).*(风向[^；]+).*(湿度[^；]+)/);
                        if (realWeatherInfo && realWeatherInfo.length > 3) {
                            that.ui.temperature.text(realWeatherInfo[1]);
                            that.ui.humidity.text(realWeatherInfo[3]);
                            that.ui.wind.text(realWeatherInfo[2]);
                        }
                    }
                }
                that.ui.climateImage.attr("src", climateImageUrl);
            })
            .fail(function(error) {
                that.ui.climateImage.attr("src", appInfo.properties.imageRoot + climateKeyWords[0].value);
                console.log(error.responseText);
            });
    }

    var chartOption = {
        chart: {
            type: 'column',
            borderWidth: 1,
            borderColor: '#d1d1d1'
        },
        legend: {
            enabled: false
        },
        yAxis: {
            min: 0,
            title: {
                enabled: false
            },
            labels: {
                enabled: false
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        }
    };

    function showYearToDateComparisonChart() {
        this.ui.yearToDateSaleChart.highcharts(_.extend({}, chartOption, {
            title: {
                text: '年至今销售额vs上年同期'
            },
            xAxis: {
                categories: [
                    'Jan'
                ],
                labels: {
                    enabled: false
                }
            },
            series: [
                {
                    name: 'Tokyo',
                    data: [49.9]
                },
                {
                    name: 'New York',
                    data: [83.6]
                }
            ]
        }));
        this.ui.yearToDateProfitChart.highcharts(_.extend({}, chartOption, {
            title: {
                text: '年至今毛利额vs上年同期'
            },
            xAxis: {
                categories: [
                    'Jan'
                ],
                labels: {
                    enabled: false
                }
            },
            series: [
                {
                    name: 'London',
                    data: [71.5]
                },
                {
                    name: 'Berlin',
                    data: [78.8]
                }
            ]
        }));
        this.ui.yearToDateQuantityChart.highcharts(_.extend({}, chartOption, {
            title: {
                text: '年至今客单数vs上年同期'
            },
            xAxis: {
                categories: [
                    'Jan'
                ],
                labels: {
                    enabled: false
                }
            },
            series: [
                {
                    name: 'Beijing',
                    data: [135.6]
                },
                {
                    name: 'Shanghai',
                    data: [106.6]
                }
            ]
        }));
    }

    function showRetailSaleTrendChart() {
        this.ui.retailSaleTrendChart.highcharts(_.extend({}, chartOption, {
            title: {
                text: '零售客单价&客单数趋势'
            },
            legend: {
                enabled: true
            },
            yAxis: [{
                min: 0,
                title: {
                    enabled: false
                },
                labels: {
                    enabled: true
                }
            }, {
                min: 0,
                title: {
                    enabled: false
                },
                labels: {
                    enabled: true
                },
                opposite: true
            }],
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ]
            },
            series: [
                {
                    name: 'Beijing',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                },
                {
                    name: 'Shanghai',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
                },
                {
                    type: "spline",
                    name: 'Beijing',
                    yAxis: 1,
                    lineWidth: 3,
                    data: [47.9, 37.5, 35.7, 38.3, 44.0, 36.0, 35.6, 48.5, 36.4, 34.1, 35.6, 46.4],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[2],
                        fillColor: 'white'
                    }
                },
                {
                    type: "spline",
                    name: 'Shanghai',
                    yAxis: 1,
                    lineWidth: 3,
                    data: [43.6, 38.8, 36.5, 43.4, 36.0, 34.5, 45.0, 44.3, 41.2, 43.5, 46.6, 40.3],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }
            ]
        }));
    }

    function showProportionChart() {
        var baseProportionChartOptions = {
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
            },
            operationProportionChartOptions = _.extend({}, baseProportionChartOptions, {series: [
                {
                    type: 'pie',
                    name: '占比',
                    data: [
                        ['大卖场', 73.46],
                        ['标超', 8.25],
                        {
                            name: '综超',
                            y: 17.26,
                            sliced: false,
                            selected: false
                        },
                        ['配送中心', 0.60],
                        ['加盟管理部', 0.12],
                        ['网购', 0.05],
                        ['优农', 0.11],
                        ['CityLife', 0.13],
                        ['奥特莱斯', 0.03]
                    ]
                }
            ]}),
            districtProportionChartOptions = _.extend({}, baseProportionChartOptions, {series: [
                {
                    type: 'pie',
                    name: '占比',
                    data: [
                        ['杭州市区', 49.75],
                        ['杭州地区', 11.81],
                        {
                            name: '绍兴地区',
                            y: 4.74,
                            sliced: false,
                            selected: false
                        },
                        ['宁波地区', 5.50],
                        ['嘉兴地区', 3.94],
                        ['台州地区', 6.22],
                        ['金华地区', 9.27],
                        ['温州地区', 3.15],
                        ['丽水地区', 1.94],
                        ['湖州地区', 2.05],
                        ['衢州地区', 1.62],
                        ['苏州地区', 0.00]
                    ]
                }
            ]}),
            retailProportionChartOptions = _.extend({}, baseProportionChartOptions, {series: [
                {
                    type: 'pie',
                    name: '占比',
                    data: [
                        ['经销-零售', 70.88],
                        ['经销-批发', 5.11],
                        {
                            name: '联营-零售',
                            y: 23.56,
                            sliced: false,
                            selected: false
                        },
                        ['联营-批发', 0.45]
                    ]
                }
            ]});
        this.ui.yearToDateOperationProportionChart.highcharts(_.extend({}, operationProportionChartOptions, {
            legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                floating: true,
                layout: "vertical"
            }
        }));
        this.ui.lastYearOperationProportionChart.highcharts(operationProportionChartOptions);
        this.ui.yearToDateDistrictProportionChart.highcharts(_.extend({}, districtProportionChartOptions, {
            legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                floating: true,
                layout: "vertical"
            }
        }));
        this.ui.lastYearDistrictProportionChart.highcharts(districtProportionChartOptions);
        this.ui.yearToDateRetailProportionChart.highcharts(_.extend({}, retailProportionChartOptions, {
            legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                floating: true,
                layout: "vertical"
            }
        }));
        this.ui.lastYearRetailProportionChart.highcharts(retailProportionChartOptions);
    }

    function iePatch() {
        if (gui.browserInfo.isIE && gui.browserInfo.version <= 8) {
            this.ui.yearToDateQuantityChart.css("margin-right", 0);
        }
    }

    return IndexView;
});