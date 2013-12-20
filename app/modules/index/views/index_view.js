define(function (require) {
    "use strict";

    // load external dependencies
    var $ = require("jquery"),
        numeral = require("numeral"),
        Marionette = require("marionette"),
        appInfo = require("app_info"),
        template = require("text!templates/index/index.html");

    var IndexView = Marionette.ItemView.extend({
        template: template,
        onRender: function () {
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
                    console.log(data);
                });
        }
    });

    return IndexView;
});