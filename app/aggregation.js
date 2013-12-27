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
        "app_info",
        "utils/util",
        "app"
    ], function () {
        "use strict";

        var $ = require("jquery"),
            app = require("app"),
            appInfo = require("app_info"),
            util = require("utils/util");

        // ----------[start]--------- global configurations for jquery and it's plugins -------------
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (settings.url && !util.string.isAbsoluteURI(settings.url)) {
                    settings.url = appInfo.properties.serviceRoot + settings.url;
                }
            }
        });

        $.cookie.json = true;

        // a small jquery plugin for getting pixels from css property
        if (!$.fn.pixels) {
            $.fn.pixels = function (property) {
                return parseInt(this.css(property).slice(0, -2));
            };
        }
        // ----------[end]--------- global configurations for jquery and it's plugins -------------

        app.start();
    });
});
