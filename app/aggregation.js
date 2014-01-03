// merge dependencies to single file
require(["config"], function () {
    require([
        "text",
        "json2",
        "numeral",
        "underscore",
        "jquery",
        "backbone",
        "marionette",
        "gui",
        "jquery.cookie",
        "jquery.dateFormat",
        "highcharts",
        "flexigrid",
        "modules/api/utils/string_util",
        "modules/api/utils/storage_util",
        "app_info",
        "app"
    ], function () {
        "use strict";

        var $ = require("jquery"),
            app = require("app"),
            appInfo = require("app_info"),
            stringUtil = require("modules/api/utils/string_util");

        // ----------[start]--------- global configurations for jquery and it's plugins -------------
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (settings.url && !stringUtil.isAbsoluteURI(settings.url)) {
                    settings.url = appInfo.properties.serviceRoot + settings.url;
                }
            }
        });

        $.cookie.json = true;

        Highcharts.setOptions({
            colors: ["#2f7ed8", "#8bbc21", "#f28f43", "#77a1e5", "#cc0000", "#0d233a", "#1aadce", "#492970", "#c42525", "#a6c96a"]
        });
        // ----------[end]--------- global configurations for jquery and it's plugins -------------


        // ----------[start]--------- some small jquery plugins -------------
        //  small jquery plugin for getting pixels from css property
        if (!$.fn.pixels) {
            $.fn.pixels = function (property) {
                return parseInt(this.css(property).slice(0, -2), 10);
            };
        }
        // ----------[end]--------- some small jquery plugins -------------

        app.start();
    });
});
