define(function (require) {
    "use strict";

    // load external dependencies
    var $ = require("jquery"),
        _ = require("underscore"),
        numeral = require("numeral"),
        Marionette = require("marionette"),
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
            yearToDateSaleChart: "#yearToDateSaleChart",
            yearToDateProfitChart: "#yearToDateProfitChart",
            yearToDateQuantityChart: "#yearToDateQuantityChart",
            systemMessageTable: "#systemMessageTable"
        },
        onRender: function () {
            showFakeDatum.call(this);
            showDateInfo.call(this);
            showWeatherInfo.call(this);
        },
        onShow: function () {
            var chartWidth = (this.ui.yearToDateSaleChart.parent().width() - this.ui.yearToDateSaleChart.pixels('margin-right') * 2) / 3;
            this.ui.yearToDateSaleChart.width(chartWidth);
            this.ui.yearToDateProfitChart.width(chartWidth);
            this.ui.yearToDateQuantityChart.width(chartWidth);
            showYearToDateComparisonChart.call(this);
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
                var sellReportMainKpiDatum = data["sell_report_main_kpi_data"];
                $("#sell-report-main-kpi-table td span").each(function (index) {
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
                console.log(data["system_messages"]);
                that.ui.systemMessageTable.flexigrid({
                    dataType: 'json',
                    colModel: [
                        { display: '列1标题', name: 'message', sortable: true, width: 150, align: 'center' },
                        { display: '列1标题', name: 'date', sortable: true, width: 80, align: 'center' }
                    ]
                });
                console.log(that.ui.systemMessageTable.flexAddData);
                that.ui.systemMessageTable.flexAddData(data["system_messages"]);
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
                    color: '#8BBC21',
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
                    color: '#8BBC21',
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
                    color: '#8BBC21',
                    data: [106.6]
                }
            ]
        }));
    }

    return IndexView;
});