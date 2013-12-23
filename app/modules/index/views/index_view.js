define(function (require) {
    "use strict";

    // load external dependencies
    var $ = require("jquery"),
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
    ]

    var IndexView = Marionette.ItemView.extend({
        template: template,
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
            climateImage: "#climateImage"
        },
        onRender: function () {
            var that = this,
                today = new Date(),
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
            $.getJSON("assets/data/index.json")
                .done(function (data) {
                    var datum = data["sell_report_main_kpi_data"];
                    $("#sell-report-main-kpi-table td span").each(function (index) {
                        var $this = $(this),
                            text = $this.text();
                        if (text == "万元" || text == "万次") {
                            $this.text(numeral(datum[index] / 10000).format("0,0") + text);
                        } else if (text == "%" || text == "元") {
                            $this.text(numeral(datum[index]).format("0,0.00") + text);
                        } else {
                            $this.text(numeral(datum[index]).format("0,0") + text);
                        }
                    });
                });

            $.getJSON(appInfo.properties.weatherServiceURL + "?callback=?")
                .done(function (data) {
                    var i,
                        length,
                        climate = data[6],
                        realWeatherInfo = data[10].match(/(气温[^；]+).*(风向[^；]+).*(湿度[^；]+)/),
                        climateImageUrl = appInfo.properties.imageRoot + climateKeyWords[(util.string.isBlank(climate) ? 0 : 1)].value;
                    that.ui.city.text(data[1]);
                    that.ui.temperature.text(realWeatherInfo[1]);
                    that.ui.humidity.text(realWeatherInfo[3]);
                    that.ui.wind.text(realWeatherInfo[2]);
                    if (!util.string.isBlank(climate)) {
                        for (i = 2, length = climateKeyWords.length; i < length; i++) {
                            if (climate.search(climateKeyWords[i].key) > -1) {
                                climateImageUrl = appInfo.properties.imageRoot + climateKeyWords[i].value;
                                break;
                            }
                        }
                    }
                    that.ui.climateImage.attr("src", climateImageUrl);
                });
        }
    });

    return IndexView;
});