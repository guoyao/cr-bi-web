define(function (require) {
    "use strict";

    // load external dependencies
    var $ = require("jquery"),
        numeral = require("numeral"),
        Marionette = require("marionette"),
        template = require("text!templates/index/index.html");

    var IndexView = Marionette.ItemView.extend({
        template: template,
        onRender: function () {
            $.ajax("assets/data/index.json", {
                dataType: "json",
                success : function (data) {
                    var datum = data["sell_report_main_kpi_data"];
                    $("#sell-report-main-kpi-table td span").each(function (index) {
                        var $this = $(this),
                            text = $this.text(),
                            data = datum[index];
                        if (text == "万元" || text == "万次") {
                            $this.text(numeral(data / 10000).format("0,0") + text);
                        } else if (text == "%" || text == "元") {
                            $this.text(numeral(data).format("0,0.00") + text);
                        } else {
                            $this.text(numeral(data).format("0,0") + text);
                        }
                    });
                }
            });
        }
    });

    return IndexView;
});