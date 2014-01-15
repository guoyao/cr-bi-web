define(function (require) {
    "use strict";

    // load external dependencies
    var $ = require("jquery"),
        _ = require("underscore"),
        numeral = require("numeral"),
        Marionette = require("marionette"),
        gui = require("gui"),
        appInfo = require("app_info"),
        dateTimeUtil = require("modules/api/utils/date_time_util"),
        stringUtil = require("modules/api/utils/string_util"),
        logUtil = require("modules/api/utils/log_util"),
        template = require("text!templates/index/views/index.html"),
        ColumnChart = require("modules/api/components/charts/column_chart"),
        YearToDateComparisonChart = require("modules/index/components/year_to_date_comparison_chart"),
        ProportionChart = require("modules/index/components/proportion_chart");

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
        disableGlobalQuery: true,
        id: appInfo.moduleMap.index.name + "Module",
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
            lastYearRetailProportionTable: "#lastYearRetailProportionTable",
            buttonBars: ".gui-btn-bar",
            buttons: ".gui-btn",
            verticalLines: ".vertical-line"
        },
        onRender: function () {
            showDateInfo.call(this);
            showWeatherInfo.call(this);
        },
        onShow: function () {
            iePatch.call(this);
            this.ui.buttonBars.guiButtonBar({
                selectedIndex: 0
            });
            showFakeDatum.call(this);
        }
    });

    function showDateInfo() {
        var today = new Date(),
            todayOfLastYear = new Date(today.getTime()),
            lunarUtil = dateTimeUtil.lunar,
            todayLunarInfos = lunarUtil.toLunar(today),
            todayOfLastYearLunarInfos;

        todayOfLastYear.setYear(today.getFullYear() - 1);
        todayOfLastYearLunarInfos = lunarUtil.toLunar(todayOfLastYear);
        this.ui.username.text(appInfo.loginInfo.userInfo.username);
        this.ui.position.text(appInfo.loginInfo.userInfo.position);
        this.ui.permission.text(appInfo.loginInfo.userInfo.permission);
        this.ui.today.text(stringUtil.substitute("{0}（{1} 农历{2}{3}）",
            $.format.date(today, "yyyy年MM月dd日"),
            lunarUtil.getChineseDay(today.getDay()),
            lunarUtil.getChineseMonth(todayLunarInfos[1]),
            lunarUtil.getChineseDate(todayLunarInfos[2])));
        this.ui.todayOfLastYear.text(stringUtil.substitute("{0}（{1} 农历{2}{3}）",
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
                showYearToDateComparisonChart.call(that, data["year_to_date_comparison_chart_datum"]);
                that.ui.systemMessageTable.flexigrid({
                    dataType: 'json',
                    width: tableWidth,
                    height: 310,
                    resizable: false,
                    colModel: [
                        { display: '消息内容', name: 'message', sortable: true, width: tableWidth - 60 - 5 * 4 - 4 - 20, align: 'left' }, // 20是垂直滚动条的宽度
                        { display: '日期', name: 'date', sortable: true, width: 60, align: 'center' }
                    ]
                });
                that.ui.systemMessageTable.flexAddData(data["system_messages"]);
                that.ui.retailSaleTrendTable.find("td.text-primary").each(function (index) {
                    var $this = $(this);
                    $this.text(retailSaleTrendDatum[index] + $this.text());
                });
                showRetailSaleTrendChart.call(that, data["retail_sale_trend_chart_datum"]);
                that.ui.yearToDateRetailProportionTable.find("td span").each(function (index) {
                    var $this = $(this);
                    $this.text(numeral(yearToDateRetailProportionDatum[index]).format("0,0.00") + $this.text());
                });
                that.ui.lastYearRetailProportionTable.find("td span").each(function (index) {
                    var $this = $(this);
                    $this.text(numeral(lastYearRetailProportionDatum[index]).format("0,0.00") + $this.text());
                });
                showProportionChart.call(that,
                    data["operation_proportion_chart_datum"],
                    data["district_proportion_chart_datum"],
                    data["retail_proportion_chart_datum"]);
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
                if (_.isArray(data)) {
                    if (data.length > 0 && data[0].search('维护') > -1) { // 天气信息服务维护中
                        that.ui.climateImage.attr("src", appInfo.properties.imageRoot + climateKeyWords[0].value);
                        return;
                    }
                    if (data.length > 1) {
                        that.ui.city.text(data[1]);
                    }
                    if (data.length > 6) {
                        climate = data[6];
                        if (!stringUtil.isBlank(climate)) {
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
                logUtil.log(error.responseText);
            });
    }

    function showYearToDateComparisonChart(dataProvider) {
        new YearToDateComparisonChart(this.ui.yearToDateSaleChart, dataProvider, {
            title: {
                text: '年至今销售额vs上年同期'
            },
            series: [
                {
                    name: '年至今销售额',
                    dataField: "year_to_date_sale"
                },
                {
                    name: '销售额同期',
                    dataField: "corresponding_period_sale"
                }
            ]
        }).render();
        new YearToDateComparisonChart(this.ui.yearToDateProfitChart, dataProvider, {
            title: {
                text: '年至今毛利额vs上年同期'
            },
            series: [
                {
                    name: '年至今毛利额',
                    dataField: "year_to_date_profit"
                },
                {
                    name: '毛利额同期',
                    dataField: "corresponding_period_profit"
                }
            ]
        }).render();
        new YearToDateComparisonChart(this.ui.yearToDateQuantityChart, dataProvider, {
            title: {
                text: '年至今客单数vs上年同期'
            },
            series: [
                {
                    name: '年至今零售客单数',
                    dataField: "year_to_date_quantity"
                },
                {
                    name: '零售客单数同期',
                    dataField: "corresponding_period_quantity"
                }
            ]
        }).render();
    }

    function showRetailSaleTrendChart(dataProvider) {
        new ColumnChart(this.ui.retailSaleTrendChart, dataProvider, {
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
        }).render();
    }

    function showProportionChart(operationChartDataProvider, districtChartDataProvider, retailChartDataProvider) {
        var legendOptions = {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                floating: true,
                layout: "vertical"
            },
            seriesOptions = [{
                type: 'pie',
                name: '占比',
                nameField: "name",
                dataField: "proportion"
            }];
        new ProportionChart(this.ui.yearToDateOperationProportionChart, operationChartDataProvider, {
            legend: legendOptions,
            series: seriesOptions
        }).render();
        new ProportionChart(this.ui.lastYearOperationProportionChart, operationChartDataProvider, {
            series: seriesOptions
        }).render();

        new ProportionChart(this.ui.yearToDateDistrictProportionChart, districtChartDataProvider, {
            legend: legendOptions,
            series: seriesOptions
        }).render();
        new ProportionChart(this.ui.lastYearDistrictProportionChart, districtChartDataProvider, {
            series: [{
                type: 'pie',
                name: '占比',
                nameField: "name",
                dataField: "corresponding_period_proportion"
            }]
        }).render();

        new ProportionChart(this.ui.yearToDateRetailProportionChart, retailChartDataProvider, {
            legend: legendOptions,
            series: seriesOptions
        }).render();
        new ProportionChart(this.ui.lastYearRetailProportionChart, retailChartDataProvider, {
            series: seriesOptions
        }).render();
    }

    function iePatch() {
        if (gui.browserInfo.isIE) {
            if (gui.browserInfo.version <= 9) {
                this.ui.buttons.guiButton();
            }
            if (gui.browserInfo.version <= 6) {
                this.ui.verticalLines.height(this.ui.verticalLines.parent().height());
            }
        }
    }

    return IndexView;
});